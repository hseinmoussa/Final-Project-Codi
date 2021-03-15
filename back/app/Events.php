<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Hobbies;
use App\User;
use App\Cities;
class Events extends Model
{
    
    protected $table = 'Events';
    public $timestamps = false;


    protected $fillable = [
        'id','name','start_date','end_date','start_time','end_time','user_id','location','city_id'
    ];


    public function hobbies()
    {
        return $this->belongsToMany(Hobbies::class, 'Events_Hobbies', 'event_id', 'hobby_id');

        
    //->withPivot('quantity')
    }


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    
    public function images()
    {
        return $this->hasMany(Images::class, 'event_id', 'id');
    }

    public function city()
    {
        return $this->belongsTo(Cities::class, 'city_id', 'id');
    }


    public static function boot() {
        parent::boot();
        self::deleting(function($user) { // before delete() method call this
             $user->hobbies()->detach();
             $user->images()->each(function($image) {
                $image->delete(); 
             });
        });
    }

}
