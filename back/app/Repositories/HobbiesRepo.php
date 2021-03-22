<?php
namespace App\Repositories;

use App\Repositories\Interfaces\HobbiesInterface;
use App\Hobbies;
use App\FileType\FileType;
use App\Http\Resources\HobbiesResources;

class HobbiesRepo implements HobbiesInterface
{

    public function index($rowNb)
    {

        $searchName  ="";
        if (isset($_GET['name'])) {
            $searchName = $_GET['name'];
        }
       
     
           

        $hobby= Hobbies::where('name', 'LIKE', '%' . $searchName. '%')
         ->with(['users','events'])
         ->paginate($rowNb);
     
         

    //  return  HobbiesResources::collection($hobby);
     return $hobby;

    }




//Main Hobbies
    public function main($rowNb)
    {

  
        $hobby= Hobbies::where('main', '1')
         ->with(['users','events'])
         ->paginate($rowNb);
 
     return $hobby;

    }
    public function show($id)
    {
        $hobby= Hobbies::where('id',$id)->first();
        
        return  $hobby;
    }

    public function relations($id)
    {
        $hobby= Hobbies::where('id',$id)->with(['users','events'])->first();
        
        return  $hobby;
    }

    public function count(){
        return  Hobbies::count(); 
    }

    
    public function storeOrUpdate($request,$id=null)
    {   
        if(is_null($id))
        {

            if(empty($request->file('image'))){
           
                $path = '';
     
             }else{
 
             $path = self::image($request->file('image'),'hobbies');
 
             }

         $hobby= new Hobbies();

         $hobby->fill($request->all());
        
        }else
        {
         
            if(empty($request->file('image'))){
           
                $path = self::findImageOfId($id);
     
             }else{

                $old_path = self::findImageOfId($id);
        
                $path = self::image($request->file('image'),'hobbies',$old_path);
            
             }

       
            $hobby = Hobbies::where('id', $id)->first();
            if(!is_null($hobby))
                $hobby->update($request->all());
            else
                return null;
            
        }

        
        $hobby->image = $path;

         $hobby->save();
      
         return $hobby;
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
      
        $hobby = self::show($id);

     
        $image = self::findImageOfId($id);

        if(!is_null($image))
          FileType::destroy($image);

        if(!is_null($hobby))
          $hobby->delete();

        return $hobby;
       
    }

}
