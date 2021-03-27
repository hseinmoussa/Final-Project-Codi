<?php
namespace App\Repositories\Interfaces;

interface Users_HobbiesInterface
{

    public function index($rowNb);

    public function indexUser($request,$rowNb);

    public function freelancers($rowNb);

    public function not_freelancers($rowNb);

    public function show($id);

    public function  storeOrUpdate($request,$id=null);

    public function  storeOrUpdateUser($request,$id=null);

    public function destroy($id);

    public function destroyUser($request,$id);

    public function count();
    


}