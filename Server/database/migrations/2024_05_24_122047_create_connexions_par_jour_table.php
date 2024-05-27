<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_connexions_par_jour_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConnexionsParJourTable extends Migration
{
    public function up()
    {
        Schema::create('Connexions_par_jour', function (Blueprint $table) {
            $table->id('ID_connexion');
            $table->unsignedBigInteger('ID_utilisateur')->nullable();
            $table->date('Date_connexion')->nullable();
            $table->timestamps();

            $table->foreign('ID_utilisateur')->references('ID_utilisateur')->on('Utilisateurs')->onDelete('cascade');
        });

        // Adding the trigger is not possible through migrations directly.
        // You need to run a raw SQL statement for the trigger.
        DB::unprepared('
            CREATE TRIGGER before_login_attempt BEFORE INSERT ON Connexions_par_jour FOR EACH ROW BEGIN
                DECLARE total_connections INT;
                SELECT COUNT(*) INTO total_connections FROM Connexions_par_jour WHERE ID_utilisateur = NEW.ID_utilisateur AND Date_connexion = CURDATE();
                IF total_connections >= 1 THEN
                    SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Vous avez déjà effectué une connexion aujourd\'hui.";
                END IF;
            END
        ');
    }

    public function down()
    {
        Schema::dropIfExists('Connexions_par_jour');
    }
}
