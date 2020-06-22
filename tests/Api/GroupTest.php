<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Group;

class GroupTest extends TestCase
{
    use WithFaker;

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
                    'group_name'
                ]
            ]);
    }

    public function testAllGroupsRetrieved() {
        $group = factory('App\Models\Group', 25)->create();

        $response = $this->json('GET', '/api/groups');
        $response
            ->assertStatus(200)
            ->assertJsonCount(25, 'data');
    }

    public function testNoGroupRetrieved() {
        $response = $this->json('GET', '/api/groups/26');
        $response->assertStatus(404);
    }
}
