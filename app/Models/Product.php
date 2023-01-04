<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'product_id','product_handle','product_variant_id','product_title','description','product_tags','product_image'
    ];
}
