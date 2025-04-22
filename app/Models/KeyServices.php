<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KeyServices extends Model
{
    protected $fillable = [
        'mainTitle',
    ];

    public function captions()
    {
        return $this->hasMany(KeyServiceItem::class, 'key_service_id');
    }
}
