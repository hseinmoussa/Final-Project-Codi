<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Users_Hobbies;
use App\Repositories\Interfaces\Users_HobbiesInterface;
use App\Response\Response;
use App\Http\Requests\Users_HobbiesRequest;

use App\Http\Requests\Users_HobbiesUserRequest;


class UsersHobbiesController extends Controller
{
    protected $repository = null;

    public function __construct(Users_HobbiesInterface $repository)
    {
        $this->repository = $repository;
    }




                    /**
 * @OA\Get(
 *     path="/api/usershobbies/{row}",
 *     description="Return all Users Hobbies informations",
 *     name="Hobby",
 * 
 *      tags={"UsersHobbies"},
 *      operationId="ApiV1getUsersHobbies",
 *      summary="Get Users Hobbies",
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
 *         description="Couldn't get any Hobby"
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
     
        $Users_Hobbies = $this->repository->index($rowNb);

        if ($Users_Hobbies) return Response::success($Users_Hobbies);
        
        return Response::error(400, "couldn't get element");
    }


           /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexUser(Request $request,$rowNb)
    {
        $Users_Hobbies = $this->repository->indexUser($request,$rowNb);

        if ($Users_Hobbies) return Response::success($Users_Hobbies);
        
        return Response::error(400, "couldn't get elements");
    }



         /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function freelancers($rowNb)
    {
     
        $Users_Hobbies = $this->repository->freelancers($rowNb);

        if ($Users_Hobbies) return Response::success($Users_Hobbies);
        
        return Response::error(400, "couldn't get Freelancers");
    }



         /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function not_freelancers($rowNb)
    {
     
        $Users_Hobbies = $this->repository->not_freelancers($rowNb);

        if ($Users_Hobbies) return Response::success($Users_Hobbies);
        
        return Response::error(400, "couldn't get element");
    }
        /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Users_HobbiesRequest $request)
    {
 
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
    
        $User_Hobby = $this->repository->storeOrUpdate($request);

        if ($User_Hobby)  
        { if($User_Hobby=='duplicate')
            return Response::error(400, "Duplicate Error!");
        return Response::success($User_Hobby);
        
        }
        return Response::error(400, "couldn't add new item");
    
          
    }



            /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeUser(Users_HobbiesUserRequest $request)
    {
 
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
    
        $User_Hobby = $this->repository->storeOrUpdateUser($request);

        if ($User_Hobby)  
        { if($User_Hobby=='duplicate')
            return Response::error(400, "You Can't Add The Same Hobby Twice!");
        return Response::success($User_Hobby);
        
        }
        return Response::error(400, "couldn't add new item");
    
          
    }


        /**
     * Display the specified resource.
     *
     * @param  \App\Users_Hobbies $User_Hobby
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $User_Hobby = $this->repository->show($id);

        if ($User_Hobby) return Response::success($User_Hobby);

        return Response::error(400, "couldn't find item");

    }

            /**
     * Display the specified resource.
     *
     * @param  \App\Users_Hobbies $User_Hobby
     * @return \Illuminate\Http\Response
     */
    public function showRelation($id)
    {

        $User_Hobby = $this->repository->relations($id);

        if ($User_Hobby) return Response::success($User_Hobby);

        return Response::error(400, "couldn't find item");

    }




    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Users_Hobbies $User_Hobby
     * @return \Illuminate\Http\Response
     */
    public function update(Users_HobbiesRequest $request, $id)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $User_Hobby = $this->repository->storeOrUpdate($request,$id);

        if ($User_Hobby)  return Response::success($User_Hobby);
        
        return Response::error(400, "couldn't update item");

        
    }




    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Users_Hobbies $User_Hobby
     * @return \Illuminate\Http\Response
     */
    public function updateUser(Users_HobbiesUserRequest $request, $id)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $User_Hobby = $this->repository->storeOrUpdateUser($request,$id);

        if ($User_Hobby)  return Response::success($User_Hobby);
        
        return Response::error(400, "couldn't update item");

        
    }



        /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Users_Hobbies $User_Hobby

     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $User_Hobby = $this->repository->destroy($id);

        if ($User_Hobby)  return Response::success("Item has been deleted successfuly");
        
        return Response::error(400, "couldn't delete item");

    }



           /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Users_Hobbies $User_Hobby

     * @return \Illuminate\Http\Response
     */
    public function destroyUser(Request $request,$id)
    {
        $User_Hobby = $this->repository->destroyUser($request,$id);

        if ($User_Hobby)  return Response::success("Item has been deleted successfuly");
        
        return Response::error(400, "couldn't delete item");

    }

}










