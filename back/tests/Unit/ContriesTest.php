<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class ContriesTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }

    public function test_can_create_contry() {

        $data = [
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
        ];

        $this->post(route('country.create'), $data)
            ->assertStatus(201)
            ->assertJson($data);
    }

}
