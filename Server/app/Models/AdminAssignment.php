<?php

namespace App\Models;

use App\Models\Plainte;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'plainte_id',
        'admin_id',
        'assignment',
    ];
    public function plainte(){
        $this->belongsTo(Plainte::class);
    }
    public function admin(){
        $this->belongsTo(Admin::class);
    }
}
