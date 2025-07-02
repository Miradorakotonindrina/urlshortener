<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Link;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;


class LinkController extends Controller
{
    public function index()
    {
        $links = \App\Models\Link::all(['id', 'original_url', 'token', 'clicks']);
        return response()->json($links);
    }

    public function store(Request $request)
{
    // Valider l'URL entrée
    $request->validate([
        'original_url' => 'required|url'
    ]);

    // Rechercher si le lien existe déjà dans la base
    $existing = Link::where('original_url', $request->original_url)->first();

    if ($existing) {
        // Lien déjà raccourci → retourner le lien existant
        return response()->json([
            'token' => $existing->token,
            'original_url' => $existing->original_url
        ], 200);
    }

    // Générer un token unique de 6 caractères
    do {
        $token = substr(str_shuffle(str_repeat(
            '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)), 0, 6);
    } while (Link::where('token', $token)->exists());

    // Créer une nouvelle entrée en base
    $shortUrl = Link::create([
        'original_url' => $request->original_url,
        'token' => $token
    ]);

    // Retourner le lien raccourci
    return response()->json([
        'token' => $shortUrl->token,
        'original_url' => $shortUrl->original_url
    ], 201);
}

    public function redirect($token)
{
    // Chercher dans la base de données l'URL correspondant au token
    $Link = Link::where('token', $token)->first();

    if (!$Link) {
        abort(404, "URL raccourcie introuvable.");
    }

    else{
    
        $Link->increment('clicks');
    // Redirige vers l'URL originale
    return Redirect::to($Link->original_url);
    }
}


}
