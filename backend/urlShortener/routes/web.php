<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LinkController;


Route::get('/s/{token}', [LinkController::class, 'redirect']); // Rediriger vers le lien original

Route::get('/', function () {
    return view('welcome');
});
