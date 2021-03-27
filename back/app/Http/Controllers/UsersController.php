<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Repositories\Interfaces\UsersInterface;
use App\Response\Response;
use App\Http\Requests\UsersRequest;

class UsersController extends Controller
{
    protected $repository = null;

    public function __construct(UsersInterface $repository)
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
     
        // new UsersResources(User::all())
        $user = $this->repository->index($rowNb);
// dd($user[0]['id']);
        if ($user) return Response::success($user);
        
        return Response::error(400, "couldn't get Users");
    }



    
    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UsersRequest $request)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
    
        $user = $this->repository->storeOrUpdate($request);

        if ($user)  return Response::success($user);
        
        return Response::error(400, "couldn't add User");
    
          
    }








    /**
     * Return the total count of users.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function count()
    {     
        $count = $this->repository->count();

        if ($count)  return Response::success($count);
        
        return Response::error(400, "couldn't find Users");
          
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $user = $this->repository->show($id);

        if ($user) return Response::success($user);

        return Response::error(400, "couldn't find user");

    }




     /**
     * Display the specified resource.
     *
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function showUserInfo(Request $request)
    {

        $user = $this->repository->showUserInfo($request);

        if ($user) return Response::success($user);

        return Response::error(400, "couldn't find user");

    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function updateUserInfo(UsersRequest $request)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $user = $this->repository->updateUserInfo($request);

        if ($user)  return Response::success($user);
        
        return Response::error(400, "couldn't update user");

        
    }

    


        /**
     * Display the specified resource.
     *
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function showRelation($id)
    {

        $user = $this->repository->relations($id);

        if ($user) return Response::success($user);

        return Response::error(400, "couldn't find user");

    }
    


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(UsersRequest $request, $id)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $user = $this->repository->storeOrUpdate($request,$id);

        if ($user)  return Response::success($user);
        
        return Response::error(400, "couldn't update user");

        
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = $this->repository->destroy($id);

        if ($user)  return Response::success("User has been deleted successfuly");
        
        return Response::error(400, "couldn't delete user");

    }


   
}


