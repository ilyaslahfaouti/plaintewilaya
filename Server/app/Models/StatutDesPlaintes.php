<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Statut extends Model
{
    use HasFactory;

    protected $table = 'Statuts_des_plaintes';
    protected $primaryKey = 'ID_statut';

    protected $fillable = [
        'Libelle_statut',
    ];
}
