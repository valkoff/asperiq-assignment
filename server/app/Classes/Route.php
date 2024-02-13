<?php

namespace App\Classes;

readonly class Route
{

    public function __construct(
        public string $destination,
        public string $gateway,
        public string $flags,
        public string $netif,
        public ?string $expire = null,
    ) {
    }

}
