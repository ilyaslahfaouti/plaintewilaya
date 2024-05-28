<?php

namespace App\Http\Controllers;

use App\Models\Commune;
use Illuminate\Http\Request;

class CommunesController extends Controller
{
    public function index()
    {
        $communes = Commune::all();
        return response()->json($communes);
    }

}
