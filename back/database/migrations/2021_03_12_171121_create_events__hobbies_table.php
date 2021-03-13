<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsHobbiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Events_Hobbies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('hobby_id')->unsigned();
            $table->bigInteger('event_id')->unsigned();

            //'id','hobby_id','event_id'



           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Events_Hobbies');
    }
}
