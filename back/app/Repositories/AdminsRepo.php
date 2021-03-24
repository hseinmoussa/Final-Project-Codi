<?php
namespace App\Repositories;

use App\Repositories\Interfaces\AdminsInterface;
use App\Admins;
// use App\Http\Resources\HobbiesResources;
use App\FileType\FileType;

class AdminsRepo implements AdminsInterface
{

    public function index($rowNb)
    {

        $searchName  = $searchEmail="";
        if (isset($_GET['name'])) 
        {
            $searchName = $_GET['name'];
        }
        if (isset($_GET['email'])) 
        {
            $searchEmail = $_GET['email'];
        }
       
     
        $Admins= Admins::where('name', 'LIKE', '%' . $searchName. '%')
        ->where('email', 'LIKE', '%' . $searchEmail. '%')
        ->paginate($rowNb);
     
         

    //  return  HobbiesResources::collection($country);
     return  $Admins;


    }

    public function show($id)
    {
        $admin= Admins::where('id',$id)->first();
        
        return  $admin;
    }


    public function count(){
        return  Admins::count(); 
    }

    

    public function updatePassword($request,$id)
    {


        $token=$request->headers->get('Authorization');

        $tokenParts = explode(".", $token);  
        $tokenHeader = base64_decode($tokenParts[0]);
        $tokenPayload = base64_decode($tokenParts[1]);
        $jwtHeader = json_decode($tokenHeader);
        $jwtPayload = json_decode($tokenPayload);
        $idd= $jwtPayload->sub;
        

        if($request->all()['password']!=$request->all()['verify_password'])
            return 'password';

        $admin = Admins::where('id', $idd)->first();
        if(!is_null($admin))
            return $admin->update(['password'=>$request->all()['password']]);
        else
            return null;
    }
    
    public function storeOrUpdate($request,$id=null)
    {   
        if(is_null($id))
        {
            if(empty($request->file('image'))){
           
                $path = '';
     
             }else{
 
             $path = self::image($request->file('image'),'admins');
 
             }
         $admin= new Admins();

         $admin->fill($request->all());
        
        }else
        {
            $data=$request->all();
       
            $admin = Admins::where('id', $id)->first();

            if(empty($request->file('image'))){
           
                $path = self::findImageOfId($id);
     
             }else{

                $old_path = self::findImageOfId($id);
        
                $path = self::image($request->file('image'),'admins',$old_path);
            
             }

            if(!is_null($admin))
                $admin->update($request->all());
            else
                return null;


             
            
        }


      


        $admin->image = $path;
         $admin->save();
         
         return $admin;
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

    public function destroy($id)
    {
      
        $admin = self::show($id);

     
        $image = self::findImageOfId($id);

        if(!is_null($image))
          FileType::destroy($image);
          
        if(!is_null($admin))
          $admin->delete();

        return $admin;
       
    }















    public function updateProfile($request,$id=null)
    {   
      

        $token=$request->headers->get('Authorization');

        $tokenParts = explode(".", $token);  
        $tokenHeader = base64_decode($tokenParts[0]);
        $tokenPayload = base64_decode($tokenParts[1]);
        $jwtHeader = json_decode($tokenHeader);
        $jwtPayload = json_decode($tokenPayload);
        $idd= $jwtPayload->sub;

            $data=$request->all();
       
            $admin = Admins::where('id', $idd)->first();

            if(empty($request->file('image'))){
           
                $path = self::findImageOfId($idd);
     
             }else{

                $old_path = self::findImageOfId($idd);
        
                $path = self::image($request->file('image'),'admins',$old_path);
            
             }

            if(!is_null($admin))
                $admin->update($request->all());
            else
                return null;


             
            
        

        $admin->image = $path;
         $admin->save();
         
         return $admin;
    }
}
