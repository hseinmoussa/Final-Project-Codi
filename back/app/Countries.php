<?php

namespace App;
use App\States;
use Illuminate\Database\Eloquent\Model;

class Countries extends Model
{
    protected $table = 'Countries';
    public $timestamps = false;


    protected $fillable = [
        'id','name','code'
    ];

    public function states()
    {
        return $this->hasMany(States::class, 'country_id', 'id');
    }


    public static function boot() 
    {
        parent::boot();
        self::deleting(function($contry) { // before delete() method call this
             $contry->states()->each(function($state) {
                $state->delete(); 
             });
               });
    }
}
