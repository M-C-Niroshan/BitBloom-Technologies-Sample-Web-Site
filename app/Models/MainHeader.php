<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MainHeader extends Model
{
    protected $fillable = [
        'mainTitle',
        'middleTitle',
        'headquartersAddress',
        'businessInquiriesAddress',
    ];
}
