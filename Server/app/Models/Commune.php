<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commune extends Model
{
    use HasFactory;

    protected $table = 'Communes_d_Agadir';
    protected $primaryKey = 'ID_commune';

    protected $fillable = [
        'Nom_commune',
    ];
}
