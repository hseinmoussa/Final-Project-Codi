<?php
namespace App\Repositories;

use App\Repositories\Interfaces\Users_HobbiesInterface;
use App\Users_Hobbies;
use App\User;
use App\Hobbies;
use App\FileType\FileType;
use App\Http\Resources\Users_HobbiesResources;

class Users_HobbiesRepo implements Users_HobbiesInterface
{

    //Return all
    public function index($rowNb)
    {

        $searchName  ="";
        if (isset($_GET['name'])) {
            $searchName = $_GET['name'];
        }
       
     
           

        $users_hobbies= Users_Hobbies::with(['user','hobby'])->paginate($rowNb);
        // ::where('name', 'LIKE', '%' . $searchName. '%')
        //  ->with(['users','events'])
         
    //  dd( $users_hobbies);
         
    // return  Users_HobbiesResources::collection($users_hobbies);
    // return  new Users_HobbiesResources($users_hobbies);
    return  $users_hobbies;


    }



    //Return All Freelancers
    public function freelancers($rowNb)
    {

        $searchName  ="";
        if (isset($_GET['name'])) {
            $searchName = $_GET['name'];
        }
       
     
        // $users_hobbies= User::with('hobbies')->paginate($rowNb);
      
         
        // $users_hobbies = User::whereHas('hobbies', function ($query) use($rowNb) {
        //     $query->where('Users_Hobbies.is_freelancer', 1);
        // })->with('hobbies')->paginate($rowNb); 

        $users_hobbies= Users_Hobbies::with(['user','hobby'])->where('is_freelancer', 1)->paginate($rowNb);

     
         

    // return  new Users_HobbiesResources($users_hobbies);
    return  $users_hobbies;


    }


    //Return all Not freelancers
    public function not_freelancers($rowNb)
    {

        $searchName  ="";
        if (isset($_GET['name'])) {
            $searchName = $_GET['name'];
        }
       
     
           

        // $users_hobbies= User::with('hobbies')->paginate($rowNb);
 
         
        // $users_hobbies = User::whereHas('hobbies', function ($query) use($rowNb) {
        //     $query->where('Users_Hobbies.is_freelancer', 0);
        // })->with('hobbies')->paginate($rowNb); 
         
        $users_hobbies= Users_Hobbies::with(['user','hobby'])->where('is_freelancer', 0)->paginate($rowNb);

     
         

    // return  new Users_HobbiesResources($users_hobbies);
    return  $users_hobbies;


    }


    public function show($id)
    {
        $user = User::whereHas('hobbies', function ($query) use($id) {
            $query->where('Users_Hobbies.id', $id);
        })->get(); 
        $hobby = Hobbies::whereHas('users', function ($query) use($id) {
            $query->where('Users_Hobbies.id', $id);
        })->get(); 
        $user_hobby= Users_Hobbies::where('id',$id)->first();

        $user_hobby->user_hobby_id = $hobby[0]->id;
        $user_hobby->user_hobby_name = $hobby[0]->name;
        $user_hobby->user_id = $user[0]->id;
        $user_hobby->user_name = $user[0]->name;
        $user_hobby->email = $user[0]->email;
        $user_hobby->phone = $user[0]->phone;
        $user_hobby->gender = $user[0]->gender;
        $user_hobby->age = $user[0]->age;
        $user_hobby->image = $user[0]->image;

        return $user_hobby;
    }


    public function count(){
        return  Users_Hobbies::count(); 
    }

    
    public function storeOrUpdate($request,$id=null)
    {   
      try{
       
        $user = User::where('id',$request->user_id)->first();

        $hobby_id = $request->hobby_id;

         

        if(is_null($id))
        {

        $user->hobbies()
        ->attach($hobby_id,['city_id'=>$request->city_id,'level_id'=>$request->level_id,'address'=>$request->address]);
        //  $user_hobby= new Users_Hobbies();

        //  $user_hobby->fill($request->all());
        
        }else
        {
         
           
            $attributes = ['city_id'=>$request->city_id,'level_id'=>$request->level_id,'address'=>$request->address];
            
            if(!is_null($user))
                $user->hobbies()->updateExistingPivot($hobby_id, $attributes);
            else
                return null;
            // return Users_Hobbies::where('id',$id)->first();
        }

        
        
         return $user->hobbies()->wherePivot('hobby_id', $hobby_id)->get();
         //find($hobby_id)->pivot;
        //  ->wherePivot('user_id',$request->user_id);
    }
    catch (\Exception $e){
      if($e->errorInfo[1] == 1062){
        return 'duplicate';
      }
    }
    }
    


    public function destroy($id)
    {
      
        $user_hobby = Users_Hobbies::where('id',$id)->first();
     
        if(!is_null($user_hobby))
          $user_hobby->delete();

        return $user_hobby;
       
    }

}
