<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_plaintes_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlaintesTable extends Migration
{
    public function up()
    {
        Schema::create('Plaintes', function (Blueprint $table) {
            $table->id('ID_plainte');
            $table->unsignedBigInteger('ID_utilisateur')->nullable();
            $table->text('Plainte')->nullable();
            $table->string('Image')->nullable();
            $table->decimal('Latitude', 10, 8)->nullable();
            $table->decimal('Longitude', 11, 8)->nullable();
            $table->dateTime('Date_heure')->nullable();
            $table->unsignedBigInteger('ID_commune')->nullable();
            $table->unsignedBigInteger('ID_statut')->nullable();
            $table->timestamps();

            $table->foreign('ID_utilisateur')->references('ID_utilisateur')->on('Utilisateurs')->onDelete('cascade');
            $table->foreign('ID_commune')->references('ID_commune')->on('Communes_d_Agadir')->onDelete('cascade');
            $table->foreign('ID_statut')->references('ID_statut')->on('Statuts_des_plaintes')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('Plaintes');
    }
}
