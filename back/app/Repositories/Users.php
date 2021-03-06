<?php
namespace App\Repositories;

use App\Repositories\Interfaces\UsersInterface;
use App\User;
use App\FileType\FileType;
use App\Http\Resources\UsersResources;

class Users implements UsersInterface
{

    public function index($rowNb)
    {

        $searchName  = $searchEmail = $serachGender="";
        
        if (isset($_GET['name'])) {
            $searchName = $_GET['name'];
        }
       
        if (isset($_GET['email'])) {
            $searchEmail = $_GET['email'];
        }

        if (isset($_GET['gender'])) {
          $serachGender = $_GET['gender'];
        }
           

        $user= User::where('name', 'LIKE', '%' . $searchName. '%')
         -> where('email', 'LIKE', '%' . $searchEmail . '%')
         -> where('gender', 'LIKE', '%' . $serachGender . '%')
         ->with(['hobbies','events'])
         ->paginate($rowNb);
     
         

    //  return  UsersResources::collection($user);
     return  $user;


    }

    public function show($id)
    {
        $user= User::where('id',$id)->first();
        
        return  $user;
    }


    public function showUserInfo($request)
    {

        $token=$request->headers->get('Authorization');

        $tokenParts = explode(".", $token);  
        $tokenHeader = base64_decode($tokenParts[0]);
        $tokenPayload = base64_decode($tokenParts[1]);
        $jwtHeader = json_decode($tokenHeader);
        $jwtPayload = json_decode($tokenPayload);
        $idd= $jwtPayload->sub;

        $user= User::where('id',$idd)->first();
        
        return  $user;
    }

    
    









        //Return the count of all Not freelancers
        public function not_freelancers($rowNb)
        {
        
        $users_hobbies= Users_Hobbies::where('is_freelancer', 0)->count();
    
        // return  new Users_HobbiesResources($users_hobbies);
        return  $users_hobbies;
    
    
        }


             //Return the count of all freelancers
             public function freelancers($rowNb)
             {
             
             $users_hobbies= Users_Hobbies::where('is_freelancer', 1)->count();
         
             // return  new Users_HobbiesResources($users_hobbies);
             return  $users_hobbies;
         
         
             }

    public function relations($id)
    {
        $user= User::where('id',$id)->with(['hobbies','events'])->first();
        
        return  $user;
    }

    public function count(){
        return  User::count(); 
    }
   

    public function image($image,$folder,$old_path=null)
    {

     if(is_null($old_path))  
    {
     $path= FileType::store($image,$folder);

     if (!$path) return Response::error(400, "Couldn't upload image");

     return $path;

    }else
    {
        $path = FileType::update($image, $folder , $old_path); 

        return $path;
    }
 
    }
    
    public function storeOrUpdate($request,$id=null)
    {   
        if(is_null($id))
        {

            if(empty($request->file('image'))){
           
                $path = '';
     
             }else{
 
             $path = self::image($request->file('image'),'users');
 
             }
         $user= new User();

         $user->fill($request->all());
        
        }else
        {
         
            $data=$request->all();
       
            $user = User::where('id', $id)->first();

            if(empty($request->file('image'))){
           
                $path = self::findImageOfId($id);
     
             }else{

                $old_path = self::findImageOfId($id);
        
                $path = self::image($request->file('image'),'users',$old_path);
            
             }
            

            $password = $request->password;

            if (trim($password) == '')
            {
                // 'name', 'email', 'password','image','phone','gender','age'

                $user->name = $data['name'];
                $user->email = $data['email'];
                $user->gender = $data['gender'];
                $user->phone = $data['phone'];
                $user->age = $data['age'];
            } else 
            {
                $user->update($request->all());
            }
        }

         $user->image = $path;
         $user->save();
      
         return $user;
    }
    


    public function updateUserInfo($request)
    {   
       
        $token=$request->headers->get('Authorization');

        $tokenParts = explode(".", $token);  
        $tokenHeader = base64_decode($tokenParts[0]);
        $tokenPayload = base64_decode($tokenParts[1]);
        $jwtHeader = json_decode($tokenHeader);
        $jwtPayload = json_decode($tokenPayload);
        $idd= $jwtPayload->sub;

         
            $data=$request->all();
       
            $user = User::where('id', $idd)->first();

            if(empty($request->file('image'))){
           
                $path = self::findImageOfId($idd);
     
             }else{

                $old_path = self::findImageOfId($idd);
        
                $path = self::image($request->file('image'),'users',$old_path);
            
             }
            

            $password = $request->password;

            if (trim($password) == '')
            {
                // 'name', 'email', 'password','image','phone','gender','age'

                $user->name = $data['name'];
                $user->email = $data['email'];
                $user->gender = $data['gender'];
                $user->phone = $data['phone'];
                $user->age = $data['age'];
            } else 
            {
                $user->update($request->all());
            }
        

         $user->image = $path;
         $user->save();
      
         return $user;
    }

    
     public function findImageOfId($id)
     {
      
        $user = $this->show($id);
        
        if(!is_null($user))
        {
        $old_path = $user->image;

        return $old_path;
        }
        return null;

     }

    public function destroy($id)
    {
      
        $image = self::findImageOfId($id);

        $user = self::show($id);

        if(!is_null($image))
          FileType::destroy($image);

        if(!is_null($user))
          $user->delete();

        return $user;
       
    }

}
