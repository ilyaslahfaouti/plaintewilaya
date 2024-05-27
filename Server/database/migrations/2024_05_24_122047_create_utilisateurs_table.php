<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_utilisateurs_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUtilisateursTable extends Migration
{
    public function up()
    {
        Schema::create('Utilisateurs', function (Blueprint $table) {
            $table->id('ID_utilisateur');
            $table->string('Nom_complet')->nullable();
            $table->string('Numero_telephone', 15)->nullable();
            $table->string('Email')->unique()->nullable();
            $table->string('Mot_de_passe')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('Utilisateurs');
    }
}
