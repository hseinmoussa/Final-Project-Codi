<?php
namespace App\Repositories;

use App\Repositories\Interfaces\EventsInterface;
use App\Events;
// use App\Http\Resources\HobbiesResources;
use FileType;
use App\Repositories\copyImage;

class EventsRepo implements EventsInterface
{

    public function index($rowNb)
    {

        $searchName  =$searchCountry="";
        if (isset($_GET['name'])) 
        {
            $searchName = $_GET['name'];
        }

        if (isset($_GET['country'])) 
        {
            $searchCountry = $_GET['country'];
            return $Events= Events::

            whereHas('state.country', function ($query) use($searchCountry) {
                $query->where('name', 'like','%' . $searchCountry. '%');
            })

            ->with(['images','user','state.country'])
            ->where('name', 'LIKE', '%' . $searchName. '%')
            ->paginate($rowNb);
        }
       
     
        $Events= Events::where('name', 'LIKE', '%' . $searchName. '%')
        ->with(['images','user','state.country'])
        ->paginate($rowNb);
     
         

    //  return  HobbiesResources::collection($country);
     return  $Events;


    }

    public function indexByHobby($rowNb,$id=null)
    {

        if (!is_null($id)) 
        {
           
            return $Events= Events::

            whereHas('hobbies', function ($query) use($id) {
                $query->where('Hobbies.id', $id);
            })

            ->with(['images','user','state.country'])
            ->paginate($rowNb);
        }
       
     
     
         

    //  return  HobbiesResources::collection($country);
     return  null;


    }

    public function show($id)
    {
        $event= Events::where('id',$id)->with(['images','user','state.country'])->first();
        
        return  $event;
    }

  

    public function count(){
        return  Events::count(); 
    }

    
    public function storeOrUpdate($request,$id=null)
    {   
        if(is_null($id))
        {
         $event= new Events();

        //  $event->fill($request->all());

         $event->name=$request->all()['name'];
         $event->location=$request->all()['location'];
         $event->start_date=$request->all()['start_date'];
         $event->end_date=$request->all()['end_date'];
         $event->zone=$request->all()['zone'];
        //  $event->start_time=$request->all()['start_time'];
        //  $event->end_time=$request->all()['end_time'];
         $event->state_id=$request->all()['state_id'];
         $event->user_id=$request->all()['user_id'];
         $event->description=$request->all()['description'];

        //  echo($request->photos);

     
        
        }else
        {
         
       
            $event = Events::where('id', $id)->first();
            if(!is_null($event))
            {
                $event->update($request->all());
            }

            else
                return null;
            
        }

        
         $event->save();
         if(!is_null($request->photos))
         foreach ($request->photos as $photo) {

            copyImage::store($photo,$event->id);
            
         }
      
         return $event;
    }
    

    public function destroy($id)
    {
      
        $event = self::show($id);

     
        if(!is_null($event))
          $event->delete();

        return $event;
       
    }

}



