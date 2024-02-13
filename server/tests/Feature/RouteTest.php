<?php

it('can return a list of routes', function () {
    $response = $this->get('/api/v1/routes');
    $response->assertStatus(200);
    $response->assertJson([
        'data' => [
            [
                'destination' => '127.0.0.1',
                'gateway' => 'link#13',
                'flags' => 'UH',
                'netif' => 'lo0',
                'expire' => null,
            ],
        ],
    ]);
});

it('can delete a route', function () {
    $response = $this->delete('/api/v1/routes/127.0.0.1');
    $response->assertStatus(204);
});

it('can disable a route', function () {
    $response = $this->post('/api/v1/routes/127.0.0.1', [
        'enabled' => false,
    ]);
    $response->assertStatus(204);
});

it('can enable a route', function () {
    $response = $this->post('/api/v1/routes/127.0.0.1', [
        'enabled' => true,
    ]);
    $response->assertStatus(204);
});
