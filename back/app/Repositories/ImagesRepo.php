<?php
namespace App\Repositories;

use App\Repositories\Interfaces\ImagesInterface;
use App\Images;
use App\FileType\FileType;
use App\Http\Resources\ImagesResources;

class ImagesRepo implements ImagesInterface
{

    public function index($rowNb)
    {

        $searchEventId  ="";
        
        if (isset($_GET['event_id'])) {
            $searchEventId = $_GET['event_id'];
        }
       
     

        $Images= Images::where('event_id', $searchEventId)
         ->with(['events'])
         ->paginate($rowNb);
     
         

     return  $Images;

    }

    public function show($id)
    {
        $Image= Images::where('id',$id)->first();
        
        return  $Image;
    }

  

    public function count(){
        return  Images::count(); 
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
 
             $path = self::image($request->file('image'),'Images');
 
             }
         $Image= new Images();
         
        
        }else
        {
           
       
            $Image = Images::where('id', $id)->first();
           
            if(empty($request->file('image'))){
           
                $path = self::findImageOfId($id);
     
             }else{

                $old_path = self::findImageOfId($id);
        
                $path = self::image($request->file('image'),'Images',$old_path);
            
             }
            

        
        
        }

        if(!is_null($Image))
        {
         $Image->image = $path;
         $Image->event_id = $request->all()['event_id'];
         $Image->save();
        }
      
         return $Image;
    }
    
     public function findImageOfId($id)
     {
      
        $Image = $this->show($id);
        
        if(!is_null($Image))
        {
        $old_path = $Image->image;

        return $old_path;
        }
        return null;

     }

    public function destroy($id)
    {
      
        $image = self::findImageOfId($id);

        $Image = self::show($id);

        if(!is_null($image))
          FileType::destroy($image);

        if(!is_null($Image))
          $Image->delete();

        return $Image;
       
    }

}
