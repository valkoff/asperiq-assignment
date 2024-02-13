<?php

namespace App\Services;

use App\Classes\Route;

class NetstatService
{

    /**
     * @return array<Route>
     */
    public function getRoutes(): array
    {
        $output = $this->execute();
        return $this->parseOutput($output);
    }

    private function execute(): array
    {
        exec('netstat -rn', $output);
        return $output;
    }

    private function parseOutput(array $output): array
    {
        $routes = [];
        foreach ($output as $i => $row) {
            if ($i <= 1) {
                continue;
            }
            $routes[] = $this->parseRow($row);
        }
        return $routes;
    }

    private function parseRow(string $row): Route
    {
        $parts = preg_split('/\s+/', $row);
        return new Route($parts[0], $parts[1], $parts[3], $parts[7]);
    }

    /**
     * @return array<Route>
     */
    public function getDummyRoutes(): array
    {
        return [
            new Route('127.0.0.1', 'link#13', 'UH', 'lo0'),
            new Route('192.168.10.0/24', '192.168.20.20', 'US', 'bridge1'),
            new Route('192.168.20.0/24', 'link#14', 'U', 'bridge0'),
            new Route('192.168.20.211', 'link#14', 'UHS', 'lo0'), new Route('192.168.50.0/24', 'link#5', 'U', 'igb4'),
            new Route('192.168.50.211', 'link#5', 'UHS', 'lo0'),
            new Route('192.168.211.0/24', 'link#15', 'U', 'bridge1'),
            new Route('192.168.211.1', 'link#15', 'UHS', 'lo0'),
        ];
    }

}
