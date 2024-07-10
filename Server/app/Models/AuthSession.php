<?php

namespace App\Models;

use App\Models\Ip;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuthSession extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'ip_id',
        'date_connected',
        'date_disconnected',
    ];
    protected function ip(){
        return $this->belongsTo(Ip::class);
    }
    protected function plaint(){
        return $this->hasOne(Plainte::class);
    }
    protected function user(){
        return $this->belongsTo(User::class);
    }
}
