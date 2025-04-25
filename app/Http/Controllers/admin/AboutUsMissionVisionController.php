<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\AboutUsMissionVission;
use Illuminate\Http\Request;

class AboutUsMissionVisionController extends Controller
{
    public function GetAboutUsMissionVisionContent()
    {
        $content = AboutUsMissionVission::first();
        return response()->json($content);
    }

    public function StoreAboutUsMissionVisionContent(Request $request)
    {
        $validated = $request->validate([
            'mission' => 'required|string',
            'vision' => 'required|string',
            'ourValues' => 'nullable|array'
        ]);

        AboutUsMissionVission::create($validated);
        return response()->json(['message' => 'Content created successfully']);
    }

    public function UpdateAboutUsMissionVisionContent(Request $request)
    {
        $validated = $request->validate([
            'mission' => 'required|string',
            'vision' => 'required|string',
            'ourValues' => 'nullable|array'
        ]);

        $content = AboutUsMissionVission::first();
        if ($content) {
            $content->update($validated);
            return response()->json(['message' => 'Content updated successfully']);
        }

        return response()->json(['message' => 'No record found'], 404);
    }

}
