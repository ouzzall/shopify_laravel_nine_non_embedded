<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\CampaignDiscount;
use App\Models\Collection;
use App\Models\CollectionProduct;
use App\Models\DiscountRule;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CampaignController extends Controller
{
    public function sync_store(Request $request)
    {
        $user = User::where('name', Auth::user()->name)->first();

        $perPage = 250;
        $productCount = $user->api()->rest('GET', '/admin/api/2022-01/products/count.json')['body']['count'];

        $iterations = ceil($productCount / $perPage);

        $next = null;

        DB::beginTransaction();
        try {

            $user = User::where('name', Auth::user()->name)->first();

            $collections_list = array();

            $response2 = $user->api()->rest('get', '/admin/api/2021-10/smart_collections.json');
            // $data = $response2['body']['smart_collections'];
            foreach ($response2['body']['smart_collections'] as $value) {
                array_push($collections_list, $value);
            }

            $response3 = $user->api()->rest('get', '/admin/api/2021-10/custom_collections.json');
            foreach ($response3['body']['custom_collections'] as $value) {
                array_push($collections_list, $value);
            }
            // return $collections_list;
            //new new new new new
            foreach ($collections_list as $key => $value) {

                $image_link = "";
                if (isset($value->image)) {
                    $image_link = $value->image->src;
                } else {
                    $image_link = '/default_image_src';
                }

                Collection::updateOrCreate([
                    'collection_id' => $value['id'],
                ], [
                    'collection_title' => $value['title'],
                    'collection_handle' => $value['handle'],
                    'collection_image' => $image_link,
                    'user_id' => $user->id
                ]);
            }

            CollectionProduct::where('user_id', $user->id)->delete();

            $all_collections = Collection::where('user_id', $user->id)->get();

            foreach ($all_collections as $key => $value) {

                //GETTING COLLECTION PRODUCTS ######################################################
                $refined_products = array();

                $perPage = 250;
                $next = null;

                do {

                    $response = $user->api()->rest('GET', '/admin/api/2021-10/collections/' . $value->collection_id . '/products.json', [
                        'limit' => $perPage,
                        'page_info' => $next
                    ]);

                    // return $response;
                    foreach ($response['body']['products'] as $product) {
                        array_push($refined_products, $product);
                    }

                    $link = $response['link'];
                    if ($link)
                        $next = $link->next;

                    // return count($response['body']['products']);
                    if (count($response['body']['products']) < 250)
                        break;
                } while (true);

                // return $refined_products;

                foreach ($refined_products as $key => $value2) {

                    $new_collection_product = new CollectionProduct;
                    $new_collection_product->user_id = $user->id;
                    $new_collection_product->collection_id = $value->collection_id;
                    $new_collection_product->product_id = $value2->id;
                    $new_collection_product->save();
                }
                //GETTING COLLECTION PRODUCTS ###################################################### END
            }

            for ($i = 0; $i < $iterations; $i++) {
                $response = $user->api()->rest('GET', '/admin/api/2022-01/products.json', [
                    'limit' => $perPage,
                    'page_info' => $next
                ]);
                foreach ($response['body']['products'] as $product) {

                    $image_link = "";
                    if (isset($product->image)) {
                        $image_link = $product->image->src;
                    } else {
                        $image_link = '/default_image_src';
                    }

                    Product::updateOrCreate([
                        'product_id' => $product->id,
                    ], [
                        'product_tags' => $product['tags'],
                        'product_title' => $product['title'],
                        'product_handle' => $product['handle'],
                        'user_id' => $user->id,
                        'description' => "defauld description",
                        'product_image' => $image_link,
                    ]);
                }
                $link = $response['link'];
                if ($link) {
                    $next = $link->next;
                }
            }

            DB::commit();

            // $new = Product::where('user_id', $user->id)->get();

            return response()->json([
                'success' => true,
                'message' => 'Products and collections added to the system',
                // 'data' => $new
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return $e->getMessage();
        }
    }

    public function get_create_campaign_data()
    {
        $products = Product::get();
        $collections = Collection::get();

        return response()->json([
            'success' => true,
            'message' => 'Products and collections shown',
            'data1' => $products,
            'data2' => $collections,
        ]);
    }

    public function add_new_campaign(Request $request)
    {
        $current_user = Auth::user();

        $shop = User::find($current_user->id);

        $new_discount_rule = new Campaign;
        $new_discount_rule->name = $request->campaign_name;
        $new_discount_rule->discount_on = $request->discount_by;
        $new_discount_rule->discount_on_data = $request->further_option;
        $new_discount_rule->start_date = $request->start_date;
        $new_discount_rule->end_date = $request->end_date;
        $new_discount_rule->discount_type = $request->discount_type;
        // $new_discount_rule->discount_tags = $request->discount_tags;
        $new_discount_rule->save();

        $discount_type = "fixed_amount";
        $target_selection_type = "all";
        $product_ids_list = [];
        $collection_ids_list = [];

        if ($request->discount_type == "percentage") {
            $discount_type = "percentage";
        }

        else if ($request->discount_type == "percentage") {
            $discount_type = "fixed_amount";
        }

        if($request->discount_by == "product") {
            $target_selection_type = "entitled";
            $product_ids_list = [$request->further_option];
        } else if($request->discount_by == "collection") {
            $target_selection_type = "entitled";
            $collection_ids_list = [$request->further_option];
        }

        foreach (json_decode($request->discount_tags) as $key => $value) {

            $code = Str::random(8);

            $createPriceRule = $shop->api()->rest('POST', '/admin/api/2021-10/price_rules.json', [
                'price_rule' => [
                    'title' => "$request->campaign_name $key",
                    'target_type' => "line_item",
                    'target_selection' => $target_selection_type,
                    'allocation_method' => 'across',
                    'usage_limit' => 1,
                    'once_per_customer' => true,
                    "value_type" => $discount_type,
                    "value" => "-$value",
                    'customer_selection' => 'all',
                    'entitled_variant_ids' => [],
                    "entitled_product_ids" => $product_ids_list,
                    "entitled_collection_ids" => $collection_ids_list,
                    'starts_at' => Carbon::createFromFormat('Y-m-d H:i:s', "$request->start_date 00:00:00"),
                    'ends_at' => Carbon::createFromFormat('Y-m-d H:i:s', "$request->end_date 23:59:59"),
                ]
            ]);

            // Log::info(json_encode($createPriceRule));

            $priceRule = $createPriceRule['body']['price_rule'];
            $discountCode = $shop->api()->rest('POST', '/admin/api/2022-01/price_rules/' . $priceRule['id'] . '/discount_codes.json', [
                'discount_code' => [
                    'code' => $code,
                ]
            ]);

            // Log::info(json_encode($discountCode));

            $new_discount_code = new CampaignDiscount;
            $new_discount_code->campaign_id = $new_discount_rule->id;
            $new_discount_code->discount_code_id = $createPriceRule['body']['price_rule']['id'];
            $new_discount_code->price_rule_id = $discountCode['body']['discount_code']['id'];
            $new_discount_code->discount_code = $code;
            $new_discount_code->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'New Campaign Created Successfully',
        ]);
    }

    public function get_all_campaigns()
    {
        $all_campaigns = Campaign::get();

        return response()->json([
            'success' => true,
            'message' => 'All campaigns shown',
            'data' => $all_campaigns,
        ]);
    }
}
