<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Cities;
class Users_Hobbies extends Model
{
    protected $table = 'Users_Hobbies';
    public $timestamps = false;


    protected $fillable = [
        'id','hobby_id','user_id','fees_per_hour','city_id','address','level_id','rating','is_freelancer'
    ];

    public function city()
    {
        return $this->belongsTo(Cities::class, 'city_id', 'id');
    }
}
