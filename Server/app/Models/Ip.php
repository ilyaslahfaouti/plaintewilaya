<?php

namespace App\Models;

use App\Models\AuthSession;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ip extends Model
{
    use HasFactory;
    protected $fillable = [
        'ip_address',
        'is_authorize'
    ];
    protected function sessions(){
         return $this->hasMany(AuthSession::class);
    }
}
