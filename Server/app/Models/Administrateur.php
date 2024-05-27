<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Administrateur extends Authenticatable
{
    use HasFactory;

    protected $table = 'Administrateurs';
    protected $primaryKey = 'ID_administrateur';

    protected $fillable = [
        'Nom_complet',
        'Email',
        'Mot_de_passe',
    ];

    protected $hidden = [
        'Mot_de_passe',
    ];
}
