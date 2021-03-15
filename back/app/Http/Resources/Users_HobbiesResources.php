<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Cities;
class Users_HobbiesResources extends ResourceCollection
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
        // foreach($this->collection[$i] as $val=>$hobby)
        {
       
            // dd($this->collection[$i]->hobbies[0]->pivot->id);
            $myarray=[];

             $myarray['user_id']= $this->collection[$i]->id;
             $myarray['user_name']= $this->collection[$i]->name;
             $myarray['email']=$this->collection[$i]->email;
             $myarray['phone']=$this->collection[$i]->phone;
             $myarray['gender']=$this->collection[$i]->gender;
             $myarray['image']=$this->collection[$i]->image;
             $myarray['age']=$this->collection[$i]->age;

             $myarray3=[];
             for ($j=0;$j<count($this->collection[$i]->hobbies);$j++)
            {   $myarray2=[];
                $myarray2['hobby_id'] = $this->collection[$i]->hobbies[$j]->pivot->id;
                $myarray2['hobby_name'] = $this->collection[$i]->hobbies[$j]->name;
                $myarray2['fees_per_hour'] = $this->collection[$i]->hobbies[$j]->pivot->fees_per_hour;
                $myarray2['address'] = $this->collection[$i]->hobbies[$j]->pivot->address;
                $myarray2['level_id'] = $this->collection[$i]->hobbies[$j]->pivot->level_id;
                $myarray2['rating'] = $this->collection[$i]->hobbies[$j]->pivot->rating;
                $myarray2['is_freelancer'] = $this->collection[$i]->hobbies[$j]->pivot->is_freelancer;
                $city=Cities::where('id',$this->collection[$i]->hobbies[$j]->pivot->city_id)->first();
                $myarray2['city_name'] = $city->id;
                $myarray2['city_id'] = $this->collection[$i]->hobbies[$j]->pivot->city_id;
                array_push($myarray3, $myarray2);
            }
            $myarray['hobbies']= $myarray3;

            array_push($hob, $myarray);

        }

        // return parent::toArray($request);
        return [
            // 'data' => $this->collection[0]->id,
            // 'data' => $this->collection,

           
                'total' => $this->total(),
                'count' => $this->count(),
                'per_page' => $this->perPage(),
                'current_page' => $this->currentPage(),
                'total_pages' => $this->lastPage(),
            
           
          
            // 'user_id' => $this->collection[0]->id,
            // 'user_name' => $this->collection[0]->name,
            // 'email'=>$this->collection[0]->email,
            // 'phone'=>$this->collection[0]->phone,
            // 'gender'=>$this->collection[0]->gender,
            // 'image'=>$this->collection[0]->image,
            // 'age'=>$this->collection[0]->age,
            // 'hobbies'=> $this->collection[0]->whenLoaded('hobbies', function () {
                // $hob=[];
                // foreach($this->collection[0]->hobbies as $hobby)
                // {
               
                //     $myarray=[];
               
                //     $myarray['hobby_id'] = $hobby->pivot->id;
                //     $myarray['hobby_name'] = $hobby->name;
                //     $myarray['fees_per_hour'] = $hobby->pivot->fees_per_hour;
                //     $myarray['address'] = $hobby->pivot->address;
                //     $myarray['level_id'] = $hobby->pivot->level_id;
                //     $myarray['rating'] = $hobby->pivot->rating;
                //     $myarray['is_freelancer'] = $hobby->pivot->is_freelancer;
                //     $city=Cities::where('id',$hobby->pivot->city_id)->first();
                //     $myarray['city_name'] = $city->id;
                //     $myarray['city_id'] = $hobby->pivot->city_id;
                    
                //     array_push($hob, $myarray);

                // }
            //     return $hob;
            'users'=>$hob,
            // }),
            // 'events'=>$this->events,
        ];
    }
}
