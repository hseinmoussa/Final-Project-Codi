<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\States;
use App\Repositories\Interfaces\StatesInterface;
use App\Response\Response;
use App\Http\Requests\StatesRequest;




class StatesController extends Controller
{
    protected $repository = null;

    public function __construct(StatesInterface $repository)
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
     
        $States = $this->repository->index($rowNb);

        if ($States) return Response::success($States);
        
        return Response::error(400, "Couldn't get States");
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StatesRequest $request)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
    
        $State = $this->repository->storeOrUpdate($request);

        if ($State)  return Response::success($State);
        
        return Response::error(400, "couldn't add new State");
    
          
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\States  $States
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $State = $this->repository->show($id);

        if ($State) return Response::success($State);

        return Response::error(400, "couldn't find State");

    }

            /**
     * Display the specified resource.
     *
     * @param  \App\States $State
     * @return \Illuminate\Http\Response
     */
    public function showRelation($id)
    {

        $State = $this->repository->relations($id);

        if ($State) return Response::success($State);

        return Response::error(400, "couldn't find State");

    }




     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\States  $States
     * @return \Illuminate\Http\Response
     */
    public function update(StatesRequest $request, $id)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $State = $this->repository->storeOrUpdate($request,$id);

        if ($State)  return Response::success($State);
        
        return Response::error(400, "couldn't update State");

        
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\States  $States
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $State = $this->repository->destroy($id);

        if ($State)  return Response::success("State has been deleted successfuly");
        
        return Response::error(400, "couldn't delete State");

    }

}










