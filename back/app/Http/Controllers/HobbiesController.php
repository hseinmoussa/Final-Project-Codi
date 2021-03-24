<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Hobbies;
use App\Repositories\Interfaces\HobbiesInterface;
use App\Response\Response;
use App\Http\Requests\HobbiesRequest;



class HobbiesController extends Controller
{
    protected $repository = null;

    public function __construct(HobbiesInterface $repository)
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
     
        $hobbies = $this->repository->index($rowNb);

        if ($hobbies) return Response::success($hobbies);
        
        return Response::error(400, "couldn't get Hobbies");
    }



           /**
     * Display a listing of The Main hobbies.
     *
     * @return \Illuminate\Http\Response
     */
    public function main($rowNb)
    {
     
        $hobbies = $this->repository->main($rowNb);

        if ($hobbies) return Response::success($hobbies);
        
        return Response::error(400, "couldn't get Hobbies");
    }

    
        /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(HobbiesRequest $request)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
    
        $Hobby = $this->repository->storeOrUpdate($request);

        if ($Hobby)  return Response::success($Hobby);
        
        return Response::error(400, "couldn't add new Hobby");
    
          
    }

        /**
     * Display the specified resource.
     *
     * @param  \App\Hobbies $Hobby
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $Hobby = $this->repository->show($id);

        if ($Hobby) return Response::success($Hobby);

        return Response::error(400, "couldn't find Hobby");

    }

            /**
     * Display the specified resource.
     *
     * @param  \App\Hobbies $Hobby
     * @return \Illuminate\Http\Response
     */
    public function showRelation($id)
    {

        $Hobby = $this->repository->relations($id);

        if ($Hobby) return Response::success($Hobby);

        return Response::error(400, "couldn't find Hobby");

    }




    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Hobbies $Hobby
     * @return \Illuminate\Http\Response
     */
    public function update(HobbiesRequest $request, $id)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $Hobby = $this->repository->storeOrUpdate($request,$id);

        if ($Hobby)  return Response::success($Hobby);
        
        return Response::error(400, "couldn't update Hobby");

        
    }



        /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Hobbies $Hobby

     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Hobby = $this->repository->destroy($id);

        if ($Hobby)  return Response::success("Hobby has been deleted successfuly");
        
        return Response::error(400, "couldn't delete Hobby");

    }

}










