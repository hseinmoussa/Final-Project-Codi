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
