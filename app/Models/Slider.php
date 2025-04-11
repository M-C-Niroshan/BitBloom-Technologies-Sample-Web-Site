<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $fillable = [
        'src',
        'caption',
    ];
/* 
    public function getImageUrlAttribute()
    {
        return asset('storage/' . $this->src);
    } */
}
