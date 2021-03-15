<?php

namespace App;
use App\Countries;
use App\Users_Hobbies;
use App\Events;
use Illuminate\Database\Eloquent\Model;

class Cities extends Model
{
    protected $table = 'Cities';
    public $timestamps = false;


    protected $fillable = [
        'id','name','country_id'
    ];

    public function country()
    {
        return $this->belongsTo(Countries::class, 'country_id', 'id');
    }

    public function users_hobbies()
    {
        return $this->hasMany(Users_Hobbies::class, 'city_id', 'id');
    }

    public function events()
    {
        return $this->hasMany(Events::class, 'city_id', 'id');
    }

//http://localhost:8000/api/cityRelations/1
    public static function boot() {
        parent::boot();
        self::deleting(function($city) { 
             $city->users_hobbies()->each(function($user_hobby) {
                $user_hobby->delete(); // <-- raise another deleting event on Post to delete comments
             });
             $city->events()->each(function($event) {
                $event->delete(); // <-- raise another deleting event on Post to delete comments
             });
        });
    }

}

