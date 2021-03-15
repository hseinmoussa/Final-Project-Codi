<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Events;
use App\Repositories\Interfaces\EventsInterface;
use App\Response\Response;
use App\Http\Requests\EventsRequest;




class EventsController extends Controller
{
    protected $repository = null;

    public function __construct(EventsInterface $repository)
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
     
        $Events = $this->repository->index($rowNb);

        if ($Events) return Response::success($Events);
        
        return Response::error(400, "Couldn't get Events");
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EventsRequest $request)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
    
        $Event = $this->repository->storeOrUpdate($request);

        if ($Event)  return Response::success($Event);
        
        return Response::error(400, "couldn't add new Event");
    
          
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Events  $Events
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $Event = $this->repository->show($id);

        if ($Event) return Response::success($Event);

        return Response::error(400, "couldn't find Event");

    }

            /**
     * Display the specified resource.
     *
     * @param  \App\Events $Event
     * @return \Illuminate\Http\Response
     */
    public function showRelation($id)
    {

        $Event = $this->repository->relations($id);

        if ($Event) return Response::success($Event);

        return Response::error(400, "couldn't find Event");

    }




     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Events  $Events
     * @return \Illuminate\Http\Response
     */
    public function update(EventsRequest $request, $id)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $Event = $this->repository->storeOrUpdate($request,$id);

        if ($Event)  return Response::success($Event);
        
        return Response::error(400, "couldn't update Event");

        
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Events  $Events
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Event = $this->repository->destroy($id);

        if ($Event)  return Response::success("Event has been deleted successfuly");
        
        return Response::error(400, "couldn't delete Event");

    }

}










