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
}
