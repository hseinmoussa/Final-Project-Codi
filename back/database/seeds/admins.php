<?php
use Illuminate\Database\Seeder;

class admins extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->delete();
        $admins = array(
          array('name' => "Hussein Moussa",'email' => 'hseinmoussa98@gmail.com','is_owner'=>1,'password'=>Hash::make(12345678),'image'=>'1'),
            );
            DB::table('admins')->insert($admins);
    }
}
