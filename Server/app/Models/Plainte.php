<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plainte extends Model
{
    use HasFactory;

    protected $table = 'plaintes';
    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'subject',
        'body',
        'date',
        'img',
        'status_id',
        'auth_session_id',

    ];

    protected function session(){
        return $this->belongsTo(AuthSession::class);
    }

    public function status()
    {
        return $this->belongsTo(PlaintStatus::class);
    }
}
