<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\AboutUsBottomHeader;
use Illuminate\Http\Request;

class AboutUsBottomController extends Controller
{
    public function GetAboutUsBottomHeaderContent()
    {
        $header = AboutUsBottomHeader::first();

        if (!$header) {
            return response()->json([
                'notExists' => true,
                'data' => null,
            ]);
        }

        return response()->json($header);
    }

    public function StoreAboutUsBottomHeaderContent(Request $request)
    {
        $validated = $request->validate([
            'mainTitle' => 'required|string|max:255',
            'subTitle' => 'required|string|max:500',
        ]);

        AboutUsBottomHeader::create($validated);
        return response()->json(['message' => 'Header created successfully']);
    }

    public function UpdateAboutUsBottomHeaderContent(Request $request)
    {
        $validated = $request->validate([
            'mainTitle' => 'required|string|max:255',
            'subTitle' => 'required|string|max:500',
        ]);

        $header = AboutUsBottomHeader::first();

        if (!$header) {
            return response()->json(['error' => 'Header not found'], 404);
        }

        $header->update($validated);
        return response()->json(['message' => 'Header updated successfully']);

    }
}
