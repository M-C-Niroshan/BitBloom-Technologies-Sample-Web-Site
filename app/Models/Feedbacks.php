<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedbacks extends Model
{
    protected $fillable = [
        'fullName',
        'role',
        'companyName',
        'src',
        'caption',
        'isShow',
    ];
}
