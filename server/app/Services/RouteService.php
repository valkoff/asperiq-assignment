<?php

namespace App\Services;

use Exception;

readonly class RouteService
{
    public function __construct(private NetstatService $netstat)
    {
    }

    public function getAll(): array
    {
        return $this->netstat->getDummyRoutes();
    }

    /**
     * @throws \Throwable
     */
    public function delete(string $destination): true
    {
        throw_if(!$this->canDeleteRoute($destination), new Exception('Route cannot be deleted'));

        /**
         * @todo Implement the actual deletion of the route
         */
        return true;
    }

    /**
     * @return bool
     *              Mocks the actual check if the route can be deleted
     */
    private function canDeleteRoute(string $destination): bool
    {
        return $destination !== '';
    }

    /**
     * @throws \Throwable
     */
    public function disable(string $destination): true
    {
        throw_if(!$this->canDisableRoute($destination), new Exception('Route cannot be disabled'));

        /**
         * @todo Implement the actual disabling of the route
         */
        return true;
    }

    /**
     * @return bool
     *              Mocks the actual check if the route can be disabled
     */
    private function canDisableRoute(string $destination): bool
    {
        return $destination !== '';
    }

    /**
     * @throws \Throwable
     */
    public function enable(string $destination): true
    {
        throw_if(!$this->canEnableRoute($destination), new Exception('Route cannot be enabled'));

        /**
         * @todo Implement the actual enabling of the route
         */
        return true;
    }

    /**
     * @return bool
     *              Mocks the actual check if the route can be disabled
     */
    private function canEnableRoute(string $destination): bool
    {
        return $destination !== '';
    }
}
