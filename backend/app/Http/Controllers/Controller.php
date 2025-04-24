<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

abstract class Controller
{
    public function success(mixed $data, string $msg="okay", int $statusCode=200):JsonResponse {
        return response()->json([
            'data' => $data,
            'success' => true,
            'msg' => $msg
        ], $statusCode);
    }

    public function error(string $msg, int $statusCode=422):JsonResponse {
        return response()->json([
            'data' => null,
            'success' => false,
            'msg' => $msg
        ], $statusCode);
    }
}
