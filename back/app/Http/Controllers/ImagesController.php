<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Repositories\Interfaces\ImagesInterface;
use App\Response\Response;
use App\Http\Requests\ImagesRequest;

class ImagesController extends Controller
{
    protected $repository = null;

    public function __construct(ImagesInterface $repository)
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
     
        // new ImagesResources(Image::all())
        $Images = $this->repository->index($rowNb);
// dd($Image[0]['id']);
        if ($Images) return Response::success($Images);
        
        return Response::error(400, "couldn't get Images");
    }

    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ImagesRequest $request)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
    
        $Image = $this->repository->storeOrUpdate($request);

        if ($Image)  return Response::success($Image);
        
        return Response::error(400, "couldn't add Image");
    
          
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Image $Image
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $Image = $this->repository->show($id);

        if ($Image) return Response::success($Image);

        return Response::error(400, "couldn't find Image");

    }


        /**
     * Display the specified resource.
     *
     * @param  \App\Image $Image
     * @return \Illuminate\Http\Response
     */
    public function showRelation($id)
    {

        $Image = $this->repository->relations($id);

        if ($Image) return Response::success($Image);

        return Response::error(400, "couldn't find Image");

    }
    


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Image $Image
     * @return \Illuminate\Http\Response
     */
    public function update(ImagesRequest $request, $id)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $Image = $this->repository->storeOrUpdate($request,$id);

        if ($Image)  return Response::success($Image);
        
        return Response::error(400, "couldn't update Image");

        
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Image  $Image
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Image = $this->repository->destroy($id);

        if ($Image)  return Response::success("Image has been deleted successfuly");
        
        return Response::error(400, "couldn't delete Image");

    }



        /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Image  $Image
     * @return \Illuminate\Http\Response
     */
    public function destroyImageUser(Request $request,$id)
    {
        $Image = $this->repository->destroyImageUser($request,$id);

        if ($Image)  return Response::success("Image has been deleted successfuly");
        
        return Response::error(400, "couldn't delete Image");

    }

    

   
}


