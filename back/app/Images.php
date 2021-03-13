<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Events;
class Images extends Model
{
    //

    protected $table = 'Images';
    public $timestamps = false;


    protected $fillable = [
        'id','image','event_id'
    ];


    public function event()
    {
        return $this->belongsTo(Events::class, 'event_id', 'id');
    }
}
