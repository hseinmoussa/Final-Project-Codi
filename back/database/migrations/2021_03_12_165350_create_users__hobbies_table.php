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
            $table->bigInteger('state_id')->unsigned();
            $table->string('level_id');
            $table->string('fees_per_hour')->nullable();
            $table->string('address');
            $table->string('rating')->nullable();
            $table->longText('about')->nullable();
            $table->boolean('is_freelancer')->nullable()->default(false);
            $table->unique(['hobby_id', 'user_id','state_id','is_freelancer']);

//        'id','hobby_id','user_id','fees_per_hour','state_id','address','level_id','rating','is_freelancer'


          
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
