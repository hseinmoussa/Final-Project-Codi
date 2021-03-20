<?php
namespace App\Repositories;

use App\Repositories\Interfaces\Events_HobbiesInterface;
use App\Events_Hobbies;
use App\Events;
use App\Hobbies;
use App\FileType\FileType;
use App\Http\Resources\Events_HobbiesResources;

class Events_HobbiesRepo implements Events_HobbiesInterface
{

    //Return all
    public function index($rowNb)
    {

        $searchName  ="";
        if (isset($_GET['name'])) {
            $searchName = $_GET['name'];
        }
       
     
           

        // $Events_Hobbies= Events::with('hobbies')->paginate($rowNb);
       
       
        // ::where('name', 'LIKE', '%' . $searchName. '%')
        //  ->with(['Events','events'])
         
        $Events_Hobbies= Events_Hobbies::with(['event.user','hobby'])->paginate($rowNb);

         

    // return  new Events_HobbiesResources($Events_Hobbies);
    return  $Events_Hobbies;


    }


    public function show($id)
    {
        $Events = Events::whereHas('hobbies', function ($query) use($id) {
            $query->where('Events_Hobbies.id', $id);
        })->get(); 
        $hobby = Hobbies::whereHas('Events', function ($query) use($id) {
            $query->where('Events_Hobbies.id', $id);
        })->get(); 
        
        if(!Events_Hobbies::where('id',$id)->first())
            return null;

        $Events_hobby= Events_Hobbies::where('id',$id)->first();

        $Events_hobby->Events_hobby_id = $hobby[0]->id;
        $Events_hobby->Events_hobby_name = $hobby[0]->name;
        $Events_hobby->Events_id = $Events[0]->id;
        $Events_hobby->Events_name = $Events[0]->name;
        $Events_hobby->email = $Events[0]->email;
        $Events_hobby->phone = $Events[0]->phone;
        $Events_hobby->gender = $Events[0]->gender;
        $Events_hobby->age = $Events[0]->age;
        $Events_hobby->image = $Events[0]->image;

        return $Events_hobby;
    }

 

    public function count(){
        return  Events_Hobbies::count(); 
    }

    
    public function storeOrUpdate($request,$id=null)
    {   
      try{
       
        $Events = Events::where('id',$request->event_id)->first();

        $hobby_id = $request->hobby_id;

         

        if(is_null($id))
        {

        $Events->hobbies()
        ->attach($hobby_id);
        //  $Events_hobby= new Events_Hobbies();

        //  $Events_hobby->fill($request->all());
        
        }else
        {
            if(!is_null($Events))
            {
                self::destroy($id);
                $Events->hobbies()
                ->attach($hobby_id);
                // $Events->hobbies()->updateExistingPivot($hobby_id);
            }
            else
                return null;
            // return Events_Hobbies::where('id',$id)->first();
        }

        
        
         return $Events->hobbies()->wherePivot('hobby_id', $hobby_id)->get();
         //find($hobby_id)->pivot;
        //  ->wherePivot('Events_id',$request->Events_id);
    }
    catch (\Exception $e){
      if($e->errorInfo[1] == 1062){
        return 'duplicate';
      }
    }
    }
    


    public function destroy($id)
    {
      
        $Events_hobby = Events_Hobbies::where('id',$id)->first();
     
        if(!is_null($Events_hobby))
          $Events_hobby->delete();

        return $Events_hobby;
       
    }

}
