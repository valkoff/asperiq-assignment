<?php

namespace App\Http\Controllers;

use App\Http\Requests\RouteStatusChangeRequest;
use App\Services\RouteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class RouteController extends Controller
{
    public function __construct(private readonly RouteService $service)
    {
    }

    public function index(): JsonResponse
    {
        sleep(rand(1, 3));
        return new JsonResponse([
            'data' => $this->service->getAll(),
        ]);
    }

    public function delete(Request $request): JsonResponse
    {
        sleep(rand(1, 3));
        $destination = $request->query('destination');

        try {
            $this->service->delete($destination);

            return new JsonResponse([], 204);
        } catch (Throwable $e) {
            return new JsonResponse([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function statusChange(RouteStatusChangeRequest $request): JsonResponse
    {
        sleep(rand(1, 3));
        $destination = $request->query('destination');
        try {
            if ($request->get('enabled') === true) {
                $this->service->enable($destination);
            } else {
                $this->service->disable($destination);
            }

            return new JsonResponse([], 204);
        } catch (Throwable $e) {
            return new JsonResponse([
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}
