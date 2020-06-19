<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Group;

class GroupTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function testGroupCreated() {
        $expected = [
            'group_name' => 'Leviticus gurus'
        ];

        $response = $this->json('POST', '/api/groups', $expected);
        $response
            ->assertStatus(201)
            ->assertJsonFragment($expected);
    }

    public function testGroupRetrieved() {
        $group = factory('App\Models\Group')->create();

        $response = $this->json('GET', '/api/groups/' . $group->id);
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'group_name',
                    'created_at',
                    'updated_at'
                ]
            ]);
    }
}
