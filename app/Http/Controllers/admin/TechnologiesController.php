<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Technologies;
use Illuminate\Http\Request;

class TechnologiesController extends Controller
{
    public function GetTechnologiesInfo()
    {
        return response()->json(Technologies::all());
    }

    public function StoreSolutionArea(Request $request)
    {
        $request->validate([
            'caption' => 'required|string|max:255',
            'src' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $path = $request->file('src')->store('technologies', 'public');

        Technologies::create([
            'caption' => $request->caption,
            'src' => '/storage/' . $path,
        ]);

        return response()->json(['message' => 'Technology added successfully.']);
    }

    // Delete a technology
    public function DeleteSolutionArea(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:technologies,id',
        ]);

        $technology = Technologies::findOrFail($request->id);

        $technology->delete();

        return response()->json(['message' => 'Technology deleted successfully.']);
    }
}
