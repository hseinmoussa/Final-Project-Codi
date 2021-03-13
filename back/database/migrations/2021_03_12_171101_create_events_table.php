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
  
//'id','name','start_date','end_date','start_time','end_time','user_id','location','city_id

        $table->bigIncrements('id');
        $table->string('name');
        $table->string('start_date');
        $table->string('end_date');
        $table->string('start_time');
        $table->string('end_time');
        $table->bigInteger('user_id')->unsigned();
        $table->bigInteger('city_id')->unsigned();
        $table->string('location');

         
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
