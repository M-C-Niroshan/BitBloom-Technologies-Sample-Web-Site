<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServicesCards extends Model
{
    use HasFactory;

    protected $fillable = ['mainTitle', 'src', 'subTitle', 'captions'];

    protected $casts = ['captions' => 'array'];
}
