<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Events;
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
        return $this->belongsToMany(Users::class, 'Users_Hobbies', 'hobby_id', 'user_id');
    //->withPivot('quantity')
    }
}
