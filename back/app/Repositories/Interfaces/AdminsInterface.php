<?php
namespace App\Repositories\Interfaces;

interface AdminsInterface
{

    public function index($rowNb);

    public function show($id);

    public function updatePassword($request,$id);

    public function storeOrUpdate($request,$id=null);

    public function destroy($id);

    public function count();

    public function updateProfile($request,$id=null);
    


}