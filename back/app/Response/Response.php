<?php

namespace App\Response;

class Response
{

    public static function success($data,$id=null)
    {
        if ($data != null) {
            if($id==null)
            $response = ['status' => 200, 'success' => true, 'data' => $data];
            else
            $response = ['status' => 200, 'success' => true, 'data' => $data,'id'=>$id];
        } else {
            $response = ['status' => 200, 'success' => true];
        }
        return response()->json($response);
    }

    public static function error($status, $message, $reason = null)
    {
        $error = ['status' => $status, 'message' => $message, 'reason' => $reason];
        $response = ['success' => false, 'error' => $error];
        return response()->json($response,$status);
    }

}
