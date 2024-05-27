<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_administrateurs_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdministrateursTable extends Migration
{
    public function up()
    {
        Schema::create('Administrateurs', function (Blueprint $table) {
            $table->id('ID_administrateur');
            $table->string('Nom_complet')->nullable();
            $table->string('Email')->unique()->nullable();
            $table->string('Mot_de_passe')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('Administrateurs');
    }
}


