<?php

namespace App;
use App\Events;
use Illuminate\Database\Eloquent\Model;

class Events_Hobbies extends Model
{
    protected $table = 'Events_Hobbies';
    public $timestamps = false;


    protected $fillable = [
        'id','hobby_id','event_id'
    ];


    public function event()
    {
        return $this->belongsTo(Events::class, 'event_id', 'id');
    }

    public function hobby()
    {
        return $this->belongsTo(Hobbies::class, 'hobby_id', 'id');
    }
}
