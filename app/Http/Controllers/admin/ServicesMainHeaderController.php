<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\ServicesMainHeader;
use Illuminate\Http\Request;

class ServicesMainHeaderController extends Controller
{
    public function GetMainHeaderContent()
    {
        $header = ServicesMainHeader::first();

        if (!$header) {
            return response()->json([
                'notExists' => true,
                'data' => null,
            ]);
        }

        return response()->json($header);
    }

    public function StoreMainHeaderContent(Request $request)
    {
        $validated = $request->validate([
            'mainTitle' => 'required|string|max:255',
            'subTitle' => 'required|string|max:255',
        ]);

        ServicesMainHeader::create($validated);
        return response()->json(['message' => 'Header created successfully']);
    }

    public function UpdateMainHeaderContent(Request $request)
    {
        $validated = $request->validate([
            'mainTitle' => 'required|string|max:255',
            'subTitle' => 'required|string|max:255',
        ]);

        $header = ServicesMainHeader::first();

        if (!$header) {
            return response()->json(['error' => 'Header not found'], 404);
        }

        $header->update($validated);
        return response()->json(['message' => 'Header updated successfully']);

    }
}
