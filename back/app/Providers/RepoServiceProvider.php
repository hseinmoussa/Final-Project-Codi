<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepoServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'App\Repositories\Interfaces\UsersInterface',
            'App\Repositories\Users'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\HobbiesInterface',
            'App\Repositories\HobbiesRepo'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\CountriesInterface',
            'App\Repositories\CountriesRepo'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\StatesInterface',
            'App\Repositories\StatesRepo'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\AdminsInterface',
            'App\Repositories\AdminsRepo'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\ImagesInterface',
            'App\Repositories\ImagesRepo'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\Users_HobbiesInterface',
            'App\Repositories\Users_HobbiesRepo'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\Events_HobbiesInterface',
            'App\Repositories\Events_HobbiesRepo'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\EventsInterface',
            'App\Repositories\EventsRepo'
        );


        
        
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
