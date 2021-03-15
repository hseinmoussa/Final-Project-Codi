<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Events;
use App\User;
class Hobbies extends Model
{
        
    protected $table = 'Hobbies';
    public $timestamps = false;


    protected $fillable = [
        'id','name'
    ];


    public function events()
    {
        return $this->belongsToMany(Events::class, 'Events_Hobbies', 'hobby_id', 'event_id');
    //->withPivot('quantity')
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'Users_Hobbies', 'hobby_id', 'user_id');
    //->withPivot('quantity')
    }


    public static function boot() {
        parent::boot();
        self::deleting(function($hobby) { // before delete() method call this
             $hobby->users()->detach();
             $hobby->events()->detach();
        });
    }
}
