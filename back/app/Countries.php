<?php

namespace App;
use App\Cities;
use Illuminate\Database\Eloquent\Model;

class Countries extends Model
{
    protected $table = 'Countries';
    public $timestamps = false;


    protected $fillable = [
        'id','name','code'
    ];

    public function cities()
    {
        return $this->hasMany(Cities::class, 'country_id', 'id');
    }


    public static function boot() 
    {
        parent::boot();
        self::deleting(function($contry) { // before delete() method call this
             $contry->cities()->each(function($city) {
                $city->delete(); 
             });
               });
    }
}
