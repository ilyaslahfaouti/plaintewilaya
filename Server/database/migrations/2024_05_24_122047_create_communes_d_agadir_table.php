<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_communes_d_agadir_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommunesDAgadirTable extends Migration
{
    public function up()
    {
        Schema::create('Communes_d_Agadir', function (Blueprint $table) {
            $table->id('ID_commune');
            $table->string('Nom_commune')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('Communes_d_Agadir');
    }
}
