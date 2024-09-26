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
        'auth_session_id',
        'subject',
        'body',
        'date',
        'img',
        'status_id',
        'commune_id',

    ];

    protected function session(){
        return $this->belongsTo(AuthSession::class);
    }

    public function plaint_status()
    {
        return $this->belongsTo(PlaintStatus::class);
    }
    public function commune(){
        return $this->belongsTo(Commune::class);
    }
}
