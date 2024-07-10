<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('plaintes', function (Blueprint $table) {
            
            $table->unsignedBigInteger('auth_session_id')->nullable()->after('id');
            $table->foreign('auth_session_id')->references('id')->on('auth_sessions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('plaintes', function (Blueprint $table) {
           $table->dropColumn('auth_session_id');
        });
    }
};
