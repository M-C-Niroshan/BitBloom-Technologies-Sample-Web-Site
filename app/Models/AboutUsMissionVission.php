<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutUsMissionVission extends Model
{
    use HasFactory;

    protected $fillable = ['mission', 'vision', 'ourValues'];

    protected $casts = ['ourValues' => 'array'];
}
