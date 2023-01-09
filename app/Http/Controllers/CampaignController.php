<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\CampaignDiscount;
use App\Models\Collection;
use App\Models\CollectionProduct;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use stdClass;

class CampaignController extends Controller
{
    private function manage_campaign($request,$shop,$target_selection_type,$discount_type,$product_ids_list,
    $collection_ids_list,$start_date_inside,$end_date_inside,$discount_rule)
    {
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
                    'starts_at' => $start_date_inside,
                    'ends_at' => $end_date_inside,
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
            $new_discount_code->campaign_id = $discount_rule->id;
            $new_discount_code->discount_code_id = $discountCode['body']['discount_code']['id'];
            $new_discount_code->price_rule_id = $createPriceRule['body']['price_rule']['id'];
            $new_discount_code->discount_code = $code;
            $new_discount_code->discount_tag = $value;
            $new_discount_code->save();
        }
    }

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
        // return $request;

        $current_user = Auth::user();
        $shop = User::find($current_user->id);

        //INITIAL VARIABLES
        $discount_rule = "";
        $message = "New Campaign Created Successfully";
        $start_date_inside = Carbon::now()->subDays(10);
        $end_date_inside = Carbon::now()->subDays(10);

        if (isset($request->duplicate_check)) {
            $discount_rule = Campaign::find($request->campaign_id);
        }

        if (isset($request->editing_check)) {
            $discount_rule = Campaign::find($request->campaign_id);
        } else {
            $discount_rule = new Campaign;
        }

        $discount_rule->name = $request->campaign_name;
        $discount_rule->discount_on = $request->discount_by;
        $discount_rule->discount_on_data = $request->further_option;
        $discount_rule->start_date = $request->start_date;
        $discount_rule->end_date = $request->end_date;
        $discount_rule->discount_type = $request->discount_type;
        $discount_rule->discount_tags = $request->discount_tags;
        $discount_rule->save();

        if (isset($request->editing_check)) {

            $delete_discount_rules = CampaignDiscount::where('campaign_id', $request->campaign_id)->get();

            foreach ($delete_discount_rules as $key => $value) {
                $shop->api()->rest('delete', '/admin/api/2022-07/price_rules/' . $value->price_rule_id . '/discount_codes/' . $value->discount_code_id . '.json', []);
                $shop->api()->rest('delete', '/admin/api/2022-04/price_rules/' . $value->price_rule_id . '.json', []);
            }

            CampaignDiscount::where('campaign_id', $request->campaign_id)->delete();

            if ($discount_rule->status == true) {
                $start_date_inside = $request->start_date;
                $end_date_inside = $request->end_date;
            }

            $message = "Existing campaign updated successfully";
        }

        $discount_type = "fixed_amount";
        $target_selection_type = "all";
        $product_ids_list = [];
        $collection_ids_list = [];

        if ($request->discount_type == "percentage") {
            $discount_type = "percentage";
        } else if ($request->discount_type == "fixed") {
            $discount_type = "fixed_amount";
        }

        if ($request->discount_by == "product") {
            $target_selection_type = "entitled";
            $product_ids_list = [$request->further_option];
        } else if ($request->discount_by == "collection") {
            $target_selection_type = "entitled";
            $collection_ids_list = [$request->further_option];
        }

        $this->manage_campaign($request,$shop,$target_selection_type,$discount_type,$product_ids_list,
        $collection_ids_list,$start_date_inside,$end_date_inside,$discount_rule);

        return response()->json([
            'success' => true,
            'message' =>  $message,
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

    public function change_campaign_status(Request $request)
    {
        // return $request;
        $current_user = Auth::user();
        $shop = User::find($current_user->id);

        $campaign = Campaign::find($request->campaign_id);
        $campaign_discounts = CampaignDiscount::where('campaign_id', $request->campaign_id)->get();

        if ($request->new_status == 'true') {
            $start_date = $campaign->start_date;
            $end_date = $campaign->end_date;
        } else {
            $start_date = Carbon::now()->subDays(10);
            $end_date = Carbon::now()->subDays(10);
        }

        foreach ($campaign_discounts as $key => $value) {

            $createPriceRule = $shop->api()->rest('PUT', '/admin/api/2021-10/price_rules/' . $value->price_rule_id . '.json', [
                'price_rule' => [
                    'starts_at' => $start_date,
                    'ends_at' => $end_date,
                ]
            ]);

            Log::info(json_encode($createPriceRule));
        }

        // return $campaign_discounts;

        $campaign = Campaign::find($request->campaign_id);
        $campaign->status = ($request->new_status === 'true');
        $campaign->save();

        return response()->json([
            'success' => true,
            'message' => 'Campaign status updated successfully',
        ]);
    }

    public function get_editing_campaign(Request $request)
    {
        $products = Product::get();
        $collections = Collection::get();
        $campaign = Campaign::find($request->campaign_id);
        $campaign_discounts = CampaignDiscount::where('campaign_id', $request->campaign_id)->get();

        return response()->json([
            'success' => true,
            'message' => 'Products and collections shown. Campaign also shown',
            'data1' => $products,
            'data2' => $collections,
            'data3' => $campaign,
            'data4' => $campaign_discounts,
        ]);
    }

    public function make_campaign_duplicate(Request $request)
    {
        // return $request;
        $current_user = Auth::user();
        $shop = User::find($current_user->id);

        $start_date_inside = Carbon::now()->subDays(10);
        $end_date_inside = Carbon::now()->subDays(10);

        $discount_rule = Campaign::find($request->campaign_id);

        $d_discount_rule = new Campaign;
        $d_discount_rule->name = $discount_rule->name." Copy";
        $d_discount_rule->discount_on = $discount_rule->discount_on;
        $d_discount_rule->discount_on_data = $discount_rule->discount_on_data;
        $d_discount_rule->start_date = $discount_rule->start_date;
        $d_discount_rule->end_date = $discount_rule->end_date;
        $d_discount_rule->discount_type = $discount_rule->discount_type;
        $d_discount_rule->discount_tags = $discount_rule->discount_tags;
        $d_discount_rule->save();

        $discount_type = "fixed_amount";
        $target_selection_type = "all";
        $product_ids_list = [];
        $collection_ids_list = [];

        if ($discount_rule->discount_type == "percentage") {
            $discount_type = "percentage";
        } else if ($discount_rule->discount_type == "fixed") {
            $discount_type = "fixed_amount";
        }

        if ($discount_rule->discount_on == "product") {
            $target_selection_type = "entitled";
            $product_ids_list = [$discount_rule->discount_on_data];
        } else if ($discount_rule->discount_on == "collection") {
            $target_selection_type = "entitled";
            $collection_ids_list = [$discount_rule->discount_on_data];
        }

        $request = new stdClass;
        $request->discount_tags = $discount_rule->discount_tags;
        $request->campaign_name = $discount_rule->name." Copy";

        $discount_rule = $d_discount_rule;

        $this->manage_campaign($request,$shop,$target_selection_type,$discount_type,$product_ids_list,
        $collection_ids_list,$start_date_inside,$end_date_inside,$discount_rule);

        return response()->json([
            'success' => true,
            'message' => 'Campaign Duplicated Successfully',
        ]);
    }

    public function delete_campaign(Request $request)
    {
        // return $request;
        $current_user = Auth::user();
        $shop = User::find($current_user->id);

        $campaign_discounts = CampaignDiscount::where('campaign_id',$request->campaign_id)->get();

        foreach ($campaign_discounts as $key => $value) {
            $shop->api()->rest('delete', '/admin/api/2022-07/price_rules/' . $value->price_rule_id . '/discount_codes/' . $value->discount_code_id . '.json', []);
            $shop->api()->rest('delete', '/admin/api/2022-04/price_rules/' . $value->price_rule_id . '.json', []);
        }

        CampaignDiscount::where('campaign_id', $request->campaign_id)->delete();

        Campaign::find($request->campaign_id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Campaign Deleted Successfully',
        ]);
    }
}
