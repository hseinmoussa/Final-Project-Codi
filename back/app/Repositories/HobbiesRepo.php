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
         $hobby= new Hobbies();

         $hobby->fill($request->all());
        
        }else
        {
         
       
            $hobby = Hobbies::where('id', $id)->first();
            if(!is_null($hobby))
                $hobby->update($request->all());
            else
                return null;
            
        }

        
         $hobby->save();
      
         return $hobby;
    }
    


    public function destroy($id)
    {
      
        $hobby = self::show($id);

     
        if(!is_null($hobby))
          $hobby->delete();

        return $hobby;
       
    }

}
