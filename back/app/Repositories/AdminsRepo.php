<?php
namespace App\Repositories;

use App\Repositories\Interfaces\AdminsInterface;
use App\Admins;
// use App\Http\Resources\HobbiesResources;

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

    
    public function storeOrUpdate($request,$id=null)
    {   
        if(is_null($id))
        {
         $admin= new Admins();

         $admin->fill($request->all());
        
        }else
        {
         
       
            $admin = Admins::where('id', $id)->first();
            if(!is_null($admin))
                $admin->update($request->all());
            else
                return null;
            
        }

        
         $admin->save();
      
         return $admin;
    }
    


    public function destroy($id)
    {
      
        $admin = self::show($id);

     
        if(!is_null($admin))
          $admin->delete();

        return $admin;
       
    }

}
