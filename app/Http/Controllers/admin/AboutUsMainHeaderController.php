<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\AboutUsMainHeader;
use Illuminate\Http\Request;

class AboutUsMainHeaderController extends Controller
{
    public function GetAboutUsMainHeaderContent()
    {
        $header = AboutUsMainHeader::first();

        if (!$header) {
            return response()->json([
                'notExists' => true,
                'data' => null,
            ]);
        }

        return response()->json($header);
    }

    public function StoreAboutUsMainHeaderContent(Request $request)
    {
        $validated = $request->validate([
            'mainTitle' => 'required|string|max:255',
            'subTitle' => 'required|string|max:255',
        ]);

        AboutUsMainHeader::create($validated);
        return response()->json(['message' => 'Header created successfully']);
    }

    public function UpdateAboutUsMainHeaderContent(Request $request)
    {
        $validated = $request->validate([
            'mainTitle' => 'required|string|max:255',
            'subTitle' => 'required|string|max:255',
        ]);

        $header = AboutUsMainHeader::first();

        if (!$header) {
            return response()->json(['error' => 'Header not found'], 404);
        }

        $header->update($validated);
        return response()->json(['message' => 'Header updated successfully']);

    }
}
