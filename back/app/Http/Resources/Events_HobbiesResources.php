<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Cities;
class Events_HobbiesResources extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        
        $hob=[];
        for ($i=0;$i<count($this->collection);$i++)
        {
       
            // dd($this->collection[$i]->hobbies[0]->pivot->id);
            $myarray=[];

             $myarray['event_id']= $this->collection[$i]->id;
             $myarray['user_name']= $this->collection[$i]->name;
             $myarray['start_date']=$this->collection[$i]->start_date;
             $myarray['end_date']=$this->collection[$i]->end_date;
            //  $myarray['zone']=$this->collection[$i]->zone;
            //  $myarray['start_time']=$this->collection[$i]->start_time;
            //  $myarray['end_time']=$this->collection[$i]->end_time;
             $myarray['location']=$this->collection[$i]->location;
       
             $myarray3=[];
             for ($j=0;$j<count($this->collection[$i]->hobbies);$j++)
            {   $myarray2=[];
                $myarray2['hobby_id'] = $this->collection[$i]->hobbies[$j]->pivot->id;
                $myarray2['hobby_name'] = $this->collection[$i]->hobbies[$j]->name;
                array_push($myarray3, $myarray2);
            }
            $myarray['hobbies']= $myarray3;

            array_push($hob, $myarray);

        }

 
 
        return [
           

           
                'total' => $this->total(),
                'count' => $this->count(),
                'per_page' => $this->perPage(),
                'current_page' => $this->currentPage(),
                'total_pages' => $this->lastPage(),
            
       
            'Events'=>$hob,
        
        ];
    }
}
