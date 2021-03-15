<?php
namespace App\Repositories;

use App\Repositories\Interfaces\CitiesInterface;
use App\Cities;
// use App\Http\Resources\HobbiesResources;

class CitiesRepo implements CitiesInterface
{

    public function index($rowNb)
    {

        $searchName  ="";
        if (isset($_GET['name'])) 
        {
            $searchName = $_GET['name'];
        }
       
     
        $cities= Cities::where('name', 'LIKE', '%' . $searchName. '%')
         ->paginate($rowNb);
     
         

    //  return  HobbiesResources::collection($country);
     return  $cities;


    }

    public function show($id)
    {
        $city= Cities::where('id',$id)->first();
        
        return  $city;
    }

    public function relations($id)
    {
        $city= Cities::where('id',$id)->with(['users_hobbies','events','country'])->first();
        
        return  $city;
    }

    public function count(){
        return  Cities::count(); 
    }

    
    public function storeOrUpdate($request,$id=null)
    {   
        if(is_null($id))
        {
         $city= new Cities();

         $city->fill($request->all());
        
        }else
        {
         
       
            $city = Cities::where('id', $id)->first();
            if(!is_null($city))
                $city->update($request->all());
            else
                return null;
            
        }

        
         $city->save();
      
         return $city;
    }
    


    public function destroy($id)
    {
      
        $city = self::show($id);

     
        if(!is_null($city))
          $city->delete();

        return $city;
       
    }

}
