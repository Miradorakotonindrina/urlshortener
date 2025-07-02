<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LinkController;


Route::post('/links', [LinkController::class, 'store']);      // Créer un lien raccourci
Route::get('/links', [LinkController::class, 'index']);       // Lister tous les liens

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
