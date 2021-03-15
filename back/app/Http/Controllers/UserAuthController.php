<?php

namespace App\Http\Controllers;
use App\Response\Response;
use App\User;
use App\Http\Requests\UsersRequest;
use App\Http\Requests\loginRequest;
use App\FileType\FileType;

class UserAuthController extends Controller
{
    
    public function register(UsersRequest $request)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
//        'name', 'email', 'password','image','phone','gender','age'

        $user = User::create([
             'name' => $request->name,
             'email'    => $request->email,
             'password' => $request->password,
             'image'=>self::image($request->file('image'),'users'),
             'phone' => $request->phone,
             'gender' => $request->gender,
             'age' => $request->age,
         ]);

        $token = auth('users')->login($user);

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
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function login(loginRequest $request)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());


        $credentials = request(['email', 'password']);

        if (! $token = auth('users')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

        /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        //return response()->json($this->guard()->user());
        return response()->json(auth('users')->user());

    }
  

     
    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */


    public function logout()
    {
        // auth('users')->logout();
        auth()->guard('users')->logout();
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
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60,
            'user'         => auth('users')->user(),
        ]);
    }
}
