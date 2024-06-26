<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commune extends Model
{
    use HasFactory;

    protected $table = 'communes';
    protected $primaryKey = 'commune_id';

    protected $fillable = [
        'nom_ar',
        'nom_fr',
    ];
}
