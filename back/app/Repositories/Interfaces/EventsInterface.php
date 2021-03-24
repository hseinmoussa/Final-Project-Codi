<?php
namespace App\Repositories\Interfaces;

interface EventsInterface
{

    public function index($rowNb);

    public function indexByHobby($rowNb,$id=null);

    public function show($id);

    public function  storeOrUpdate($request,$id=null);

    public function destroy($id);

    public function count();
    


}