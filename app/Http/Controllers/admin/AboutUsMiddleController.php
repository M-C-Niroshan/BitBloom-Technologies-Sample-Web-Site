<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\AboutUsMiddleHeader;
use Illuminate\Http\Request;

class AboutUsMiddleController extends Controller
{
    public function GetAboutUsMiddleHeaderContent()
    {
        $header = AboutUsMiddleHeader::first();

        if (!$header) {
            return response()->json([
                'notExists' => true,
                'data' => null,
            ]);
        }

        return response()->json($header);
    }

    public function StoreAboutUsMiddleHeaderContent(Request $request)
    {
        $validated = $request->validate([
            'mainTitle' => 'required|string|max:255',
            'subTitle' => 'required|string|max:255',
        ]);

        AboutUsMiddleHeader::create($validated);
        return response()->json(['message' => 'Header created successfully']);
    }

    public function UpdateAboutUsMiddleHeaderContent(Request $request)
    {
        $validated = $request->validate([
            'mainTitle' => 'required|string|max:255',
            'subTitle' => 'required|string|max:255',
        ]);

        $header = AboutUsMiddleHeader::first();

        if (!$header) {
            return response()->json(['error' => 'Header not found'], 404);
        }

        $header->update($validated);
        return response()->json(['message' => 'Header updated successfully']);

    }
}
