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
        Schema::create('Plaintes', function (Blueprint $table) {
            $table->id('id_plainte');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->text('Plainte')->nullable();
            $table->dateTime('Date_heure')->nullable();
            $table->unsignedBigInteger('commune')->nullable();
            $table->unsignedBigInteger('status')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('commune')->references('commune_id')->on('communes');
            $table->foreign('status')->references('id')->on('statuts_plaintes');
        });
    }

    public function down()
    {
        Schema::dropIfExists('Plaintes');
    }
};
