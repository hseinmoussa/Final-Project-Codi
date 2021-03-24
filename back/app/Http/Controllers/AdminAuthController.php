<?php

namespace App\Http\Controllers;
use App\Response\Response;
use App\Admins;
use App\Http\Requests\AdminsRequest;
use App\Http\Requests\loginRequest;
use App\FileType\FileType;

use Illuminate\Contracts\Auth\MustVerifyEmail;
class AdminAuthController extends Controller
{
    
    public function register(AdminsRequest $request)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
//        'name', 'email', 'password','image','phone','gender','age'

        $admin = Admins::create([
             'name' => $request->name,
             'email'    => $request->email,
             'password' => $request->password,
             'image'=>self::image($request->file('image'),'admins'),
         ]);

        $token = auth('admins')->login($admin);

        return $this->respondWithToken($token);
    }

    public function image($image,$folder,$old_path=null)
    {

     if(is_null($old_path))  
    {
     $path= FileType::store($image,$folder);

     if (!$path) return Response::error(400, "Couldn't upload image");

     return $path;

    }else
    {
        $path = FileType::update($image, $folder , $old_path); 

        return $path;
    }
 
    }


   


     /**
 * @OA\Get(
 *     path="/index",
 *     description="Return a user's first and last name",
 *     name="Projects",
 *     @OA\Parameter(
 *         name="firstname",
 *         in="query",
 *         type="string",
 *         description="Your first name",
 *         required=true,
 *     ),
 *     @OA\Parameter(
 *         name="lastname",
 *         in="query",
 *         type="string",
 *         description="Your last name",
 *         required=true,
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="OK",
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Missing Data"
 *     ),
 *   @OA\Tag(
     *     name="Projects",
     *     description="API Endpoints of Projects"
     * )
 * )
 */
    public function login(loginRequest $request)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());


        $credentials = request(['email', 'password']);

        if (! $token = auth('admins')->attempt($credentials)) {
            return response()->json(['status'=>400,'error' => 'Unauthorized'], 401);

        }

        return $this->respondWithToken($token);
    }

 
  

     
    /**
     * Log the admin out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */


    public function logout()
    {
        // auth('users')->logout();
        auth()->guard('admins')->logout();
        // $this->guard()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'status'=>200,
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60,
            'admin'         => auth('admins')->user(),
        ]);
    }
}
