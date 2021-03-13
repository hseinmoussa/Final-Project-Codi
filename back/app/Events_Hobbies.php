<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Events_Hobbies extends Model
{
    protected $table = 'Events_Hobbies';
    public $timestamps = false;


    protected $fillable = [
        'id','hobby_id','event_id'
    ];
}
