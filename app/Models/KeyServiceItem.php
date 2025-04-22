<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KeyServiceItem extends Model
{
    protected $fillable = [
        'caption',
        'key_service_id',
    ];

    public function keyService()
    {
        return $this->belongsTo(KeyServices::class, 'key_service_id');
    }
}
