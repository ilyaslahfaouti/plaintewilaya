<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plainte extends Model
{
    use HasFactory;

    protected $table = 'plaintes';
    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'Plainte',
        'Image',
        'Latitude',
        'Longitude',
        'Date_heure',
        'ID_commune',
        'ID_statut',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'ID_utilisateur');
    }

    public function commune()
    {
        return $this->belongsTo(Commune::class, 'ID_commune');
    }

    public function statut()
    {
        return $this->belongsTo(Statut::class, 'ID_statut');
    }
}
