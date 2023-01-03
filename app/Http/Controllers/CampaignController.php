<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\Collection;
use App\Models\CollectionProduct;
use App\Models\DiscountRule;
use App\Models\Product;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
                Collection::updateOrCreate([
                    'collection_id' => $value['id'],
                ], [
                    'collection_title' => $value['title'],
                    'collection_handle' => $value['handle'],
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

                    // $image_link = "";
                    // if($product->image)
                    // {
                    //     $image_link = $product->image->src;
                    // }
                    // else
                    // {
                    //     $image_link = '/default_image_src';
                    // }

                    Product::updateOrCreate([
                        'product_id' => $product->id,
                    ], [
                        'product_tags' => $product['tags'],
                        'product_title' => $product['title'],
                        'product_handle' => $product['handle'],
                        'user_id' => $user->id,
                        'description' => "defauld description",
                        // 'image_src' => $image_link,
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
        $discount_rules = DiscountRule::get();

        return response()->json([
            'success' => true,
            'message' => 'Products and collections shown',
            'data1' => $products,
            'data2' => $collections,
            'data3' => $discount_rules
        ]);
    }

    public function add_new_discount_rule(Request $request)
    {
        // return $request;

        $new_discount_rule = new DiscountRule;
        $new_discount_rule->name = $request->rule_name;
        $new_discount_rule->discount_type = $request->discount_type;
        $new_discount_rule->upto_amount = $request->upto_amount;
        $new_discount_rule->save();

        $all_discount_rules = DiscountRule::get();

        return response()->json([
            'success' => true,
            'message' => 'New discount rule added',
            'data' => $all_discount_rules,
            'selected_discount_rule' => $new_discount_rule
        ]);
    }

    public function add_new_campaign(Request $request)
    {
        // return $request;

        $new_discount_rule = new Campaign;
        $new_discount_rule->name = $request->campaign_name;
        $new_discount_rule->discount_rule_id = $request->discount_rule_id;
        $new_discount_rule->discount_on = $request->discount_by;
        $new_discount_rule->discount_on_data = $request->further_option;
        $new_discount_rule->start_date = $request->start_date;
        $new_discount_rule->end_date = $request->end_date;
        $new_discount_rule->save();

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