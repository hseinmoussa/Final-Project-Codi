<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersHobbiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Users_Hobbies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('hobby_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('city_id')->unsigned();
            $table->bigInteger('level_id')->unsigned();
            $table->float('fees_per_hour')->nullable();
            $table->string('address');
            $table->float('rating')->nullable();
            $table->boolean('is_freelancer')->nullable()->default(false);
            $table->unique(['hobby_id', 'user_id','city_id']);

//        'id','hobby_id','user_id','fees_per_hour','city_id','address','level_id','rating','is_freelancer'


          
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Users_Hobbies');
    }
}
