<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Events;
use App\Repositories\Interfaces\EventsInterface;
use App\Response\Response;
use App\Http\Requests\EventsRequest;
use App\Http\Requests\EventsUserRequest;




class EventsController extends Controller
{
    protected $repository = null;

    public function __construct(EventsInterface $repository)
    {
        $this->repository = $repository;
    }




                /**
 * @OA\Get(
 *     path="/api/events/{row}",
 *     description="Return all Events informations",
 *     name="Hobby",
 * 
 *      tags={"Events"},
 *      operationId="Events",
 *      summary="Get Events",
 *
 *     @OA\Parameter(
 *          name="row",
 *          in="path",
 *          required=true, 
 *          type="string" 
 *      ),
 *     @OA\Response(
 *         response=200,
 *         description="OK",
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Couldn't get any Event"
 *     ),
 *   @OA\Tag(
     *     name="Projects",
     *     description="API Endpoints of Projects"
     * )
 * )
 */

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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexUser(Request $request,$rowNb)
    {
     
        $Events = $this->repository->indexUser($request,$rowNb);

        if ($Events) return Response::success($Events);
        
        return Response::error(400, "Couldn't get Events");
    }

    

        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexByHobby($rowNb,$id)
    {
     
        $Events = $this->repository->indexByHobby($rowNb,$id);

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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeUser(EventsUserRequest $request)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
    
        $Event = $this->repository->storeOrUpdateUser($request);

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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Events  $Events
     * @return \Illuminate\Http\Response
     */
    public function updateUser(EventsUserRequest $request, $id)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $Event = $this->repository->storeOrUpdateUser($request,$id);

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


       /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Events  $Events
     * @return \Illuminate\Http\Response
     */
    public function destroyUser(Request $request,$id)
    {
        $Event = $this->repository->destroyUser($request,$id);

        if ($Event)  return Response::success("Event has been deleted successfuly");
        
        return Response::error(400, "couldn't delete Event");

    }


       /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Events  $Events
     * @return \Illuminate\Http\Response
     */
    public function dettachHobbyUser(Request $request,$idEvent,$idHobby)
    {
        $Hobby = $this->repository->dettachHobbyUser($request,$idEvent,$idHobby);

        if ($Hobby)  return Response::success("Hobby has been deleted successfuly");
        
        return Response::error(400, "couldn't delete Hobby");

    }
}










