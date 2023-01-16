<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class SettingsController extends Controller
{
    public function get_current_settings()
    {
        $current_user = Auth::user();
        $shop = User::find($current_user->id);

        $current_settings = Setting::where('user_id',$shop->id)->first();

        if(empty($current_settings)) {
            $current_settings = new Setting;
            $current_settings->user_id = $shop->id;
            $current_settings->save();
        }

        $current_settings = Setting::where('user_id',$shop->id)->first();

        return response()->json([
            'success' => true,
            'message' =>  "Current Settings Displayed",
            'data' => $current_settings,
        ]);
    }

    public function change_pop_up_type(Request $request)
    {
        // return $request;
        $current_user = Auth::user();
        $shop = User::find($current_user->id);

        $link = "";

        if($request->pop_up_type == "client_gif") {

            $vbl3 = rand(100000000000000,999999999999999);
            $vbl4 = File::extension($request->new_file->getClientOriginalName());
            request()->new_file->storeAs('public/uploaded_images',$vbl3.".".$vbl4);
        }


        $current_settings = Setting::where('user_id',$shop->id)->first();
        $current_settings->user_id = $shop->id;
        $current_settings->pop_up_type = $request->pop_up_type;

        if($request->pop_up_type == "client_gif") {
            $current_settings->pop_up_data = "storage/uploaded_images/$vbl3.$vbl4";
            $link = "storage/uploaded_images/$vbl3.$vbl4";
        }

        $current_settings->save();

        return response()->json([
            'success' => true,
            'message' => "Pop Up Settings Changed",
            'data' => $link,
        ]);
    }
}
