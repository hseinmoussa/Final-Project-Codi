<?php
namespace App\Repositories\Interfaces;

interface HobbiesInterface
{

    public function index($rowNb);

    public function show($id);

    public function relations($id);

    public function  storeOrUpdate($request,$id=null);

    public function destroy($id);

    public function count();
    


}