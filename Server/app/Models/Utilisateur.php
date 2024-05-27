<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Utilisateur extends Authenticatable
{
    use HasFactory;

    protected $table = 'Utilisateurs';
    protected $primaryKey = 'ID_utilisateur';

    protected $fillable = [
        'Nom_complet',
        'Numero_telephone',
        'Email',
        'Mot_de_passe',
        'email_verified_at', // Ajout de la colonne pour stocker la date de vérification de l'e-mail
        'verification_code', // Ajout de la colonne pour stocker le code de vérification
    ];

    protected $hidden = [
        'Mot_de_passe',
    ];

    public function connexions()
    {
        return $this->hasMany(Connexion::class, 'ID_utilisateur');
    }

    public function plaintes()
    {
        return $this->hasMany(Plainte::class, 'ID_utilisateur');
    }
}
