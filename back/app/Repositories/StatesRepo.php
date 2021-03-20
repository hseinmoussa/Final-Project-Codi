<?php
namespace App\Repositories;

use App\Repositories\Interfaces\StatesInterface;
use App\States;
// use App\Http\Resources\HobbiesResources;

class StatesRepo implements StatesInterface
{

    public function index($rowNb)
    {

        $searchName  ="";
        if (isset($_GET['name'])) 
        {
            $searchName = $_GET['name'];
        }
       
     
        $states= States::where('name', 'LIKE', '%' . $searchName. '%')
        ->with('country')
         ->paginate($rowNb);
     
         

    //  return  HobbiesResources::collection($country);
     return  $states;


    }

    public function show($id)
    {
        $state= States::where('id',$id)->first();
        
        return  $state;
    }

    public function relations($id)
    {
        $state= States::where('id',$id)->with(['users_hobbies','events','country'])->first();
        
        return  $state;
    }

    public function count(){
        return  States::count(); 
    }

    
    public function storeOrUpdate($request,$id=null)
    {   
        if(is_null($id))
        {
         $state= new States();

         $state->fill($request->all());
        
        }else
        {
         
       
            $state = States::where('id', $id)->first();
            if(!is_null($state))
                $state->update($request->all());
            else
                return null;
            
        }

        
         $state->save();
      
         return $state;
    }
    


    public function destroy($id)
    {
      
        $state = self::show($id);

     
        if(!is_null($state))
          $state->delete();

        return $state;
       
    }

}
