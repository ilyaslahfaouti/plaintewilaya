<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Connexion extends Model
{
    use HasFactory;

    protected $table = 'Connexions_par_jour';
    protected $primaryKey = 'ID_connexion';

    protected $fillable = [
        'ID_utilisateur',
        'Date_connexion',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'ID_utilisateur');
    }
}
