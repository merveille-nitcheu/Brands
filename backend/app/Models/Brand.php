<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Brand extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'brand_name',
        'brand_image',
        'rating',
        'country_id',
        'description'
    ];
}
