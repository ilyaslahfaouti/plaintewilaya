<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_statuts_des_plaintes_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStatutsDesPlaintesTable extends Migration
{
    public function up()
    {
        Schema::create('Statuts_des_plaintes', function (Blueprint $table) {
            $table->id('ID_statut');
            $table->string('Libelle_statut')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('Statuts_des_plaintes');
    }
}
