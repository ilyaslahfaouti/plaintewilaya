<?php

namespace App\Http\Controllers\AdminControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommuneController extends Controller
{
    static function getCommunes(){
        $communesQuery = "SELECT c.id as 'id', c.nom_fr AS 'nom_fr', c.nom_ar AS 'nom_ar', COUNT(p.id) AS 'plaintes'
            FROM communes c LEFT JOIN plaintes p
            ON
                p.commune_id = c.id
                AND p.status_id = 1
            GROUP BY
                c.id, c.nom_fr, c.nom_ar;";
        $communes = DB::select($communesQuery);
        return $communes;

    }
}
