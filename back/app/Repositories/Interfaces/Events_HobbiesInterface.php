<?php
namespace App\Repositories\Interfaces;

interface Events_HobbiesInterface
{

    public function index($rowNb);

    public function show($id);

    public function  storeOrUpdate($request,$id=null);

    public function destroy($id);

    public function count();
    


}