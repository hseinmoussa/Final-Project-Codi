<?php
namespace App\Repositories;

use App\Images;
use App\FileType\FileType;
use App\Http\Resources\ImagesResources;

class copyImage 
{

  

 
   

    public static function image($image,$folder,$old_path=null)
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
    
    public static function store($request,$event_id,$id=null)
    {   
        if(is_null($id))
        {

            if(empty($request)){
           
                $path = '';
     
             }else{
 
             $path = self::image($request,'Images');
 
             }
         $Image= new Images();
         
        
        }

        if(!is_null($Image))
        {
         $Image->image = $path;
         $Image->event_id = $event_id;
         $Image->save();
        }
      
         return $Image;
    }
    
    


}
