<?php
namespace App\Http\Controllers;

use App\Admins;
use Illuminate\Http\Request;
use App\Http\Requests\AdminRequest;

class AdminAuthController extends Controller
{
    public function register(AdminRequest $request)
    {

        $admin = Admins::create([
             'name' => $request->name,
             'email'    => $request->email,
             'password' => $request->password,
             'is_owner' => $request->is_owner,
             'image' => $request->image,
         ]);

        $token = auth('admins')->login($admin);

        return $this->respondWithToken($token);
    }

    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth('admins')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }


          /**
     * Get the authenticated Admin
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        //return response()->json($this->guard()->user());
        return response()->json(auth('admins')->user());

    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function logout()
    {
        auth('admins')->logout();

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
            'Admin'         => auth()->user()
        ]);
    }
}
