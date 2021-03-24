<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\States;
use App\User;
use App\Hobbies;
class Users_Hobbies extends Model
{
    protected $table = 'Users_Hobbies';
    public $timestamps = false;


    protected $fillable = [
        'id','hobby_id','user_id','fees_per_hour','state_id','address','level_id','rating','is_freelancer','about'
    ];

    public function state()
    {
        return $this->belongsTo(States::class, 'state_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function hobby()
    {
        return $this->belongsTo(Hobbies::class, 'hobby_id', 'id');
    }
    
}
