<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactUsLeftSideContent extends Model
{
    protected $fillable = [
        'mainCaption',
        'email',
        'phone',
        'address',
    ];
}
