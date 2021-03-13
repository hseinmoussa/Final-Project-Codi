<?php

namespace App;
use App\Countries;
use App\Users_Hobbies;
use App\Events;
use Illuminate\Database\Eloquent\Model;

class Cities extends Model
{
    protected $table = 'Countries';
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
}

