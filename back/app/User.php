<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;


use App\Events;
use App\Hobbies;

use App\Notifications\VerifyApiEmail;
class User extends Authenticatable implements JWTSubject , MustVerifyEmail

{
    use Notifiable;
    protected $table = 'users';

    
    
    public function sendApiEmailVerificationNotification()

    {

    $this->notify(new VerifyApiEmail); // my notification

    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','image','phone','gender','age'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
    public function setPasswordAttribute($password)
    {
        if ( !empty($password) ) {
            $this->attributes['password'] = bcrypt($password);
        }
    } 


    public function hobbies()
    {
        return $this->belongsToMany(Hobbies::class, 'Users_Hobbies', 'user_id', 'hobby_id')->withPivot('id','fees_per_hour','state_id','address','level_id','rating','is_freelancer');

    }
    public function events()
    {
        return $this->hasMany(Events::class, 'user_id', 'id');
    }

 

    public static function boot() {
        parent::boot();
        self::deleting(function($user) { // before delete() method call this
             $user->hobbies()->each(function($hobby) {
                $hobby->delete(); // <-- direct deletion
             });
             $user->events()->each(function($event) {
                $event->delete(); // <-- raise another deleting event on Post to delete comments
             });
             // do the rest of the cleanup...
        });
    }


}
