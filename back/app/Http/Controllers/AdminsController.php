<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Admins;
use App\Repositories\Interfaces\AdminsInterface;
use App\Response\Response;
use App\Http\Requests\AdminsRequest;
use App\Http\Requests\AdminsPassRequest;

class AdminsController extends Controller
{
    protected $repository = null;

    public function __construct(AdminsInterface $repository)
    {
        $this->repository = $repository;
    }



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($rowNb)
    {
     
        // new AdminsResources(Admin::all())
        $Admin = $this->repository->index($rowNb);
// dd($Admin[0]['id']);
        if ($Admin) return Response::success($Admin);
        
        return Response::error(400, "couldn't get Admins");
    }

    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AdminsRequest $request)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
    
        $Admin = $this->repository->storeOrUpdate($request);

        if ($Admin)  return Response::success($Admin);
        
        return Response::error(400, "couldn't add Admin");
    
          
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Admin $Admin
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $Admin = $this->repository->show($id);

        if ($Admin) return Response::success($Admin);

        return Response::error(400, "couldn't find Admin");

    }


 
    


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Admin $Admin
     * @return \Illuminate\Http\Response
     */
    public function update(AdminsRequest $request, $id)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $Admin = $this->repository->storeOrUpdate($request,$id);

        if ($Admin)  return Response::success($Admin);
        
        return Response::error(400, "couldn't update Admin");

        
    }






    /**
     * Update Single resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Admin $Admin
     * @return \Illuminate\Http\Response
     */
    public function updateProfile(AdminsRequest $request, $id)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $Admin = $this->repository->updateProfile($request,$id);

        if ($Admin)  return Response::success($Admin);
        
        return Response::error(400, "couldn't update Admin");

        
    }




        /**
     * Update Password for admin.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Admin $Admin
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(AdminsPassRequest $request, $id)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $Admin = $this->repository->updatePassword($request,$id);
        
        if(!$Admin)
            return Response::error(400, "couldn't update Admin");
            
        if ($Admin && $Admin!=='password')  
            return Response::success($Admin);
        if($Admin==='password')
            return Response::error(400, "Password and verify password should be the same");
        
        
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Admin  $Admin
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Admin = $this->repository->destroy($id);

        if ($Admin)  return Response::success("Admin has been deleted successfuly");
        
        return Response::error(400, "couldn't delete Admin");

    }


   
}


