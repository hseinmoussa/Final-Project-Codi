<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Events', function (Blueprint $table) {
  
//'id','name','start_date','end_date','start_time','end_time','user_id','location','state_id

        $table->bigIncrements('id');
        $table->string('name');
        $table->datetime('start_date');
        $table->datetime('end_date');
        $table->string('zone');
        // $table->string('start_time');
        // $table->string('end_time');

        $table->bigInteger('user_id')->unsigned();
        $table->bigInteger('state_id')->unsigned();
        $table->string('location');
        $table->string('description');

         
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Events');
    }
}
