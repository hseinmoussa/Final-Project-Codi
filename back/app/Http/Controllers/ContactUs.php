<?php
namespace App\Http\Controllers;
use App\Mail\ContactMail;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mail;
use App\Response\Response;

use Illuminate\Support\Facades\Validator;

class ContactUs extends Controller
{

public function sendEmail(Request $request)
{

 
$validatedData = Validator::make($request->all(), [
  'email'=>'required|email',
  'subject'=>'required',
  'message'=>'required|max:150',
  'phone'=>'required|max:150',
  'name'=>'required|max:150',
]);

if ($validatedData->fails())
return Response::error(400,$validatedData->messages()->first());

$this->sendMail($request);
return Response::success('Check your inbox, we have sent a link to reset email.');
}
public function sendMail($request)
{
Mail::to('hseinmoussa98@gmail.com')->send(new ContactMail($request));
}

}






