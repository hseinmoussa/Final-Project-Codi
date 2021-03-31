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
 * @OA\Get(
 *     path="/api/states/{row}",
 *     description="Return all States informations",
 *     name="Hobby",
 * 
 *      tags={"States"},
 *      operationId="ApiV1getStates",
 *      summary="Get States",
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
 *         description="Couldn't get any State"
 *     ),
 *   @OA\Tag(
     *     name="Projects",
     *     description="API Endpoints of Projects"
     * )
 * )
 */
    public function index($rowNb)
    {
     
        $States = $this->repository->index($rowNb);

        if ($States) return Response::success($States);
        
        return Response::error(400, "Couldn't get States");
    }


        /**
 * @OA\Post(
 *     path="/api/admin/state",
 *     description="Add new state and return it",
 *     name="Hobby",
 *  security={{"token": {}}},
 *      tags={"States"},
 *      operationId="ApiV1addState",
 *      summary="Add State",
 

 *   @OA\Parameter(
     *      name="name",
     *      in="query",
     *      required=true,
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     *   @OA\Parameter(
     *      name="country_id",
     *      in="query",
     *      required=true,
     *      @OA\Schema(
     *          type="number"
     *      )
     *   ),
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *   @OA\Response(
     *      response=401,
     *       description="Unauthenticated"
     *   ),
     *   @OA\Response(
     *      response=400,
     *      description="Bad Request"
     *   ),
     *   @OA\Response(
     *      response=404,
     *      description="not found"
     *   ),
     *   @OA\Response(
     *      response=500,
     *      description="Duplicate Entry!"
     *   ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
 * )
 */
    public function store(StatesRequest $request)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
    
        $State = $this->repository->storeOrUpdate($request);

        if ($State)  return Response::success($State);
        
        return Response::error(400, "couldn't add new State");
    
          
    }









            /**
 * @OA\Get(
 *     path="/api/state/{id}",
 *     description="Show specific ID and return it",
 *     name="Hobby",
 * 
 *      tags={"States"},
 *      operationId="ApiV1getState",
 *      summary="Show specific State",
 

 *   @OA\Parameter(
     *      name="id",
     *      in="path",
     *      required=true,
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),

     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),

     *   @OA\Response(
     *      response=400,
     *      description="Bad Request"
     *   ),
     *   @OA\Response(
     *      response=404,
     *      description="not found"
     *   ),

  
 * )
 */

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
 * @OA\Put(
 *     path="/api/admin/state/{id}",
 *     description="Update specific ID and return it",
 *     name="Hobby",
 *  security={{"token": {}}},
 * 
 *      tags={"States"},
 *      operationId="ApiV1putState",
 *      summary="Update State",


 *   @OA\Parameter(
     *      name="id",
     *      in="path",
     *      required=true,
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
     *  *   @OA\Parameter(
     *      name="name",
     *      in="query",
     *      required=true,
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     *   @OA\Parameter(
     *      name="country_id",
     *      in="query",
     *      required=true,
     *      @OA\Schema(
     *          type="number"
     *      )
     *   ),

     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),

     *   @OA\Response(
     *      response=400,
     *      description="Bad Request"
     *   ),
     *   @OA\Response(
     *      response=404,
     *      description="not found"
     *   ),

  
 * )
 */


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
             * 
             * /**

 
 * @OA\Delete(
 *     path="/api/admin/state/{id}",
 *     description="Delete specific State",
 *     name="Hobby",
 *   security={{"token": {}}},
 * 
 *      tags={"States"},
 *      operationId="ApiV1deleteState",
 *      summary="Delete State",


 *   @OA\Parameter(
     *      name="id",
     *      in="path",
     *      required=true,
     *      @OA\Schema(
     *           type="integer"
     *      )
     *   ),
     * 
 

     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),

     *   @OA\Response(
     *      response=400,
     *      description="Bad Request"
     *   ),
     *   @OA\Response(
     *      response=404,
     *      description="not found"
     *   ),

  
 * )
 */

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










