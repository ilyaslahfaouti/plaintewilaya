<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('Administrateurs', function (Blueprint $table) {
            $table->id();
            $table->string('Nom_complet')->nullable();
            $table->string('Email')->unique()->nullable();
            $table->string('Mot_de_passe')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('Administrateurs');
    }
};
