<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Cities;
use App\Repositories\Interfaces\CitiesInterface;
use App\Response\Response;
use App\Http\Requests\CitiesRequest;




class CitiesController extends Controller
{
    protected $repository = null;

    public function __construct(CitiesInterface $repository)
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
     
        $Cities = $this->repository->index($rowNb);

        if ($Cities) return Response::success($Cities);
        
        return Response::error(400, "Couldn't get Cities");
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CitiesRequest $request)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
    
        $City = $this->repository->storeOrUpdate($request);

        if ($City)  return Response::success($City);
        
        return Response::error(400, "couldn't add new City");
    
          
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Cities  $Cities
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $City = $this->repository->show($id);

        if ($City) return Response::success($City);

        return Response::error(400, "couldn't find City");

    }

            /**
     * Display the specified resource.
     *
     * @param  \App\Cities $City
     * @return \Illuminate\Http\Response
     */
    public function showRelation($id)
    {

        $City = $this->repository->relations($id);

        if ($City) return Response::success($City);

        return Response::error(400, "couldn't find City");

    }




     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Cities  $Cities
     * @return \Illuminate\Http\Response
     */
    public function update(CitiesRequest $request, $id)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $City = $this->repository->storeOrUpdate($request,$id);

        if ($City)  return Response::success($City);
        
        return Response::error(400, "couldn't update City");

        
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Cities  $Cities
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $City = $this->repository->destroy($id);

        if ($City)  return Response::success("City has been deleted successfuly");
        
        return Response::error(400, "couldn't delete City");

    }

}










