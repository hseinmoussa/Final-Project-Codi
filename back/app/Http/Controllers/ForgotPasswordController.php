<?php
namespace App\Http\Controllers;
use App\Mail\ForgotMail;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mail;
use App\Response\Response;


// Mail is the general mail class ,Forgotmail is the class you wrote to actully send an email.
class ForgotPasswordController extends Controller
{
// main function to send an email
// $request have the email of the registered user
public function sendPasswordResetEmail(Request $request)
{
// If email does not exist
$email = $request->email;
if (User::where('email', $email)->doesntExist()) {
    // return response()->json(['status'=>404], "Email Not Found");

    return Response::error(404, "Email Not Found");
// return error(404, "Email Not Found");
} else {
// If email exists
$this->sendMail($email);
return Response::success('Check your inbox, we have sent a link to reset email.');
}
}
// this function generates a token and use the mail class to send an email
public function sendMail($email)
{
$token = $this->generateToken($email);
Mail::to($email)->send(new ForgotMail($token));
}
// this function generates a new random token for the user
// it store the token with the user email in reset password table in db
public function generateToken($email)
{
$token = rand(1, 100000);
$this->storeToken($token, $email);
return $token;
}
// this function store the email and token in the db
public function storeToken($token, $email)
{
DB::table('password_resets')->insert([
'email' => $email,
'token' => $token,
'created_at' => Carbon::now(),
]);
}
// Reset Password Funtion
// recive the email,token and new password from the frontend request
public function reset(Request $request)
{
$password = $request->password;
// Validate the token
$tokenData = DB::table('password_resets')->where('token', $request->token)->first();
// You should Redirect the user back to the password reset request form if the token is invalid
if (!$tokenData) {
return Response::error(401, "Invalid token");
}
$user = User::where('email', $tokenData->email)->first();
// You should Redirect the user back if the email is invalid
if (!$user) {
return Response::error(404, 'Email not found');
}
// update the new password
$user->password = $password;
$user->update(); //or $user->save();
//Delete the token
DB::table('password_resets')->where('email', $user->email)->delete();
return Response::success('Password updated successfully');

}

}


