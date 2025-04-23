<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterContent extends Model
{
    protected $fillable = [
        'companyName',
        'leftSideCaption',
        'facebookURL',
        'twitterURL',
        'linkdinURL',
        'instagramURL',
        'headquartersAddress',
        'inquiriesMailAddress',
        'contactNumber',
        'bottomCaption',
    ];
}
