<?php
namespace App\Repositories;

use App\Repositories\Interfaces\EventsInterface;
use App\Events;
// use App\Http\Resources\HobbiesResources;
use FileType;
use App\Repositories\copyImage;
use App\Hobbies;

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
             $Events= Events::

            whereHas('state.country', function ($query) use($searchCountry) {
                $query->where('name', 'like','%' . $searchCountry. '%');
            })

            ->with(['images','user','state.country'])
            ->where('name', 'LIKE', '%' . $searchName. '%')
            ->paginate($rowNb);
        }
       
     
        else
        $Events= Events::where('name', 'LIKE', '%' . $searchName. '%')
        ->with(['images','user','state.country'])
        ->paginate($rowNb);
     
        if (isset($_GET['filter'])) 
        {
            
          
            function custom_sort( $array )
            {
            
            asort($array);

            return $array;
            }

            $searchfilter=$_GET['filter'];
            $Events = Events:: whereHas('hobbies',function ($query) use ($searchfilter) {
               $new_array=explode(",",$searchfilter[0]);
                    $query->whereIn('hobby_id', $new_array);
            })
            ->with(['images','user','state.country'])
            ->paginate($rowNb);

           
        }
         

    //  return  HobbiesResources::collection($country);
     return  $Events;


    }



    public function indexUser($request,$rowNb)
    {

        $token=$request->headers->get('Authorization');

        $tokenParts = explode(".", $token);  
        $tokenHeader = base64_decode($tokenParts[0]);
        $tokenPayload = base64_decode($tokenParts[1]);
        $jwtHeader = json_decode($tokenHeader);
        $jwtPayload = json_decode($tokenPayload);
        $idd= $jwtPayload->sub;

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
            ->whereHas('user', function ($query) use($idd) {
                $query->where('id', $idd);
            })
            

            ->with(['images','user','state.country','hobbies'])
            ->where('name', 'LIKE', '%' . $searchName. '%')
            ->paginate($rowNb);
        }
       
     
        $Events= Events::where('name', 'LIKE', '%' . $searchName. '%')
        ->with(['images','user','state.country','hobbies'])
        ->whereHas('user', function ($query) use($idd) {
            $query->where('id', $idd);
        })
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
    



    public function storeOrUpdateUser($request,$id=null)
    {   
        $token=$request->headers->get('Authorization');
        $tokenParts = explode(".", $token);  
        $tokenHeader = base64_decode($tokenParts[0]);
        $tokenPayload = base64_decode($tokenParts[1]);
        $jwtHeader = json_decode($tokenHeader);
        $jwtPayload = json_decode($tokenPayload);
        $idd= $jwtPayload->sub;

        if(is_null($id))
        {
         $event= new Events();

        //  $event->fill($request->all());

         $event->name=$request->all()['name'];
         $event->location=$request->all()['location'];
         $event->start_date=$request->all()['start_date'];
         $event->end_date=$request->all()['end_date'];
         $event->zone=$request->all()['zone'];
         $event->state_id=$request->all()['state_id'];
         $event->user_id=$idd;
         $event->description=$request->all()['description'];

        //  echo($request->photos);


     
        
        }else
        {
         
       
            $event = Events::where('id', $id)->first();
            if(!is_null($event))
            {

                $event->name=$request->all()['name'];
                $event->location=$request->all()['location'];
                $event->start_date=$request->all()['start_date'];
                $event->end_date=$request->all()['end_date'];
                $event->zone=$request->all()['zone'];
                $event->state_id=$request->all()['state_id'];
                $event->user_id=$idd;
                $event->description=$request->all()['description'];

                // $event->update($request->all());
            }

            else
                return null;
            
        }

        
         $event->save();
         if(!is_null($request->photos))
         foreach ($request->photos as $photo) {

            copyImage::store($photo,$event->id);
            
         }
         if(!is_null($request->hobbies))
         foreach ($request->hobbies as $hobby) {

            $event->hobbies()
            ->attach($hobby);
            
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


    public function destroyUser($request,$id)
    {
        $token=$request->headers->get('Authorization');
        $tokenParts = explode(".", $token);  
        $tokenHeader = base64_decode($tokenParts[0]);
        $tokenPayload = base64_decode($tokenParts[1]);
        $jwtHeader = json_decode($tokenHeader);
        $jwtPayload = json_decode($tokenPayload);
        $idd= $jwtPayload->sub;

      
        $event = self::show($id);

     
        if($event->user->id!=$idd)
        return null;
        
        if(!is_null($event))
          $event->delete();

        return $event;
       
    }



    public function dettachHobbyUser($request,$idEvent,$idHobby)
    {

        $token=$request->headers->get('Authorization');

        $tokenParts = explode(".", $token);  
        $tokenHeader = base64_decode($tokenParts[0]);
        $tokenPayload = base64_decode($tokenParts[1]);
        $jwtHeader = json_decode($tokenHeader);
        $jwtPayload = json_decode($tokenPayload);
        $idd= $jwtPayload->sub;

        
        $event = self::show($idEvent);
        

        $verify_Not_Hacker=$event
        ->whereHas('user', function ($query) use($idd) {
            $query->where('id', $idd);
        });

        // $hobby= Hobbies::where('id',$idHobby)->first();
        // dd($hobby);

        if($verify_Not_Hacker)
        return $event->hobbies()->detach($idHobby);

        return null;

    

    }

}



