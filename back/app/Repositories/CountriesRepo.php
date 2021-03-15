<?php
namespace App\Repositories;

use App\Repositories\Interfaces\CountriesInterface;
use App\Countries;
use App\FileType\FileType;
// use App\Http\Resources\HobbiesResources;

class CountriesRepo implements CountriesInterface
{

    public function index($rowNb)
    {

        $searchName  ="";
        if (isset($_GET['name'])) {
            $searchName = $_GET['name'];
        }
       
     
        $country= Countries::where('name', 'LIKE', '%' . $searchName. '%')
         ->with('cities')
         ->paginate($rowNb);
     
         

    //  return  HobbiesResources::collection($country);
     return  $country;


    }

    public function show($id)
    {
        $country= Countries::where('id',$id)->first();
        
        return  $country;
    }

    public function relations($id)
    {
        $country= Countries::where('id',$id)->with('cities')->first();
        
        return  $country;
    }

    public function count(){
        return  Countries::count(); 
    }

    
    public function storeOrUpdate($request,$id=null)
    {   
        if(is_null($id))
        {
         $country= new Countries();

         $country->fill($request->all());
        
        }else
        {
         
       
            $country = Countries::where('id', $id)->first();
            if(!is_null($country))
                $country->update($request->all());
            else
                return null;
            
        }

        
         $country->save();
      
         return $country;
    }
    


    public function destroy($id)
    {
      
        $country = self::show($id);

     
        if(!is_null($country))
          $country->delete();

        return $country;
       
    }

}
