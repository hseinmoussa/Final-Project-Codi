<?php
namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
class Forgotmail extends Mailable{
use Queueable, SerializesModels;
public $token;
/**
* Create a new message instance.
*
* @return void
*/
public function __construct($token)
{
// instializing the email data with the token recived from the function sendMail
$this->data = $token;
}
/**
* Build the message.
*
* @return $this
*/
public function build()
{
// from the defult email that your user will recvie emails from
// the view is the blade file that is the email format
// compact is what passes the data to the view
// why send the data? because u need to pass the token in the url to authnticate the reset password 
// Subject is the defult subjects for all emails
$data = $this->data;
return $this->from("hseinmoussa98@gmail.com")->view('forgot', compact('data'))->subject(" inReturn Password Reset Link");
}
}
