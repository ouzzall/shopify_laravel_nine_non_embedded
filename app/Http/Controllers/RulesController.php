<?php

namespace App\Http\Controllers;

use App\Models\DiscountRule;
use Illuminate\Http\Request;

class RulesController extends Controller
{
    public function get_rules_data()
    {
        $all_rules = DiscountRule::get();

        return response()->json([
            'success' => true,
            'message' => 'All discount rules shown',
            'data' => $all_rules
        ]);
    }
}
