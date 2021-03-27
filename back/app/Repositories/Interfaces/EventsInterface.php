<?php
namespace App\Repositories\Interfaces;

interface EventsInterface
{

    public function index($rowNb);

    public function indexUser($request,$rowNb);

    public function indexByHobby($rowNb,$id=null);

    public function show($id);

    public function  storeOrUpdate($request,$id=null);

    public function  storeOrUpdateUser($request,$id=null);

    public function destroy($id);

    public function destroyUser($request,$id);

    public function dettachHobbyUser($request,$idEvent,$idHobby);

    public function count();
    


}