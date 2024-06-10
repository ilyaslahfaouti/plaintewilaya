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
        'commune',
        'subject',
        'body',
        'date',
        'img',

    ];

    protected function user(){
        return $this->belongsTo(User::class);
    }

}
