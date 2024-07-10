<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaintStatus extends Model
{
    use HasFactory;
    
    protected $fillable = ['status'];

    public function plaintes()
    {
        return $this->hasMany(Plainte::class);
    }
}
