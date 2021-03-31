<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Countries;
use App\Repositories\Interfaces\CountriesInterface;
use App\Response\Response;
use App\Http\Requests\CountriesRequest;




class CountriesController extends Controller
{
    protected $repository = null;

    public function __construct(CountriesInterface $repository)
    {
        $this->repository = $repository;
    }



            /**
 * @OA\Get(
 *     path="/api/countries/{row}",
 *     description="Return all Countries informations",
 *     name="Hobby",
 * 
 *      tags={"Countries"},
 *      operationId="ApiV1getCountries",
 *      summary="Get Countries",
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
 *         description="Couldn't get any Country"
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
     
        $Countries = $this->repository->index($rowNb);

        if ($Countries) return Response::success($Countries);
        
        return Response::error(400, "couldn't get Countries");
    }






    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CountriesRequest $request)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
    
        $Country = $this->repository->storeOrUpdate($request);

        if ($Country)  return Response::success($Country);
        
        return Response::error(400, "couldn't add new Country");
    
          
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Countries  $countries
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $Country = $this->repository->show($id);

        if ($Country) return Response::success($Country);

        return Response::error(400, "couldn't find Country");

    }

            /**
     * Display the specified resource.
     *
     * @param  \App\Countries $Country
     * @return \Illuminate\Http\Response
     */
    public function showRelation($id)
    {

        $Country = $this->repository->relations($id);

        if ($Country) return Response::success($Country);

        return Response::error(400, "couldn't find Country");

    }




     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Countries  $countries
     * @return \Illuminate\Http\Response
     */
    public function update(CountriesRequest $request, $id)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $Country = $this->repository->storeOrUpdate($request,$id);

        if ($Country)  return Response::success($Country);
        
        return Response::error(400, "couldn't update Country");

        
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Countries  $countries
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Country = $this->repository->destroy($id);

        if ($Country)  return Response::success("Country has been deleted successfuly");
        
        return Response::error(400, "couldn't delete Country");

    }

}










