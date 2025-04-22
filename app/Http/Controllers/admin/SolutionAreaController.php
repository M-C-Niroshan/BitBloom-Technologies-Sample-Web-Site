<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\SolutionArea;
use Illuminate\Http\Request;

class SolutionAreaController extends Controller
{
    public function GetSolutionAreaInfo()
    {
        return response()->json(SolutionArea::all());
    }

    public function StoreSolutionArea(Request $request)
    {
        $request->validate([
            'caption' => 'required|string',
            'src' => 'required|image',
        ]);

        $path = $request->file('src')->store('solution_areas', 'public');

        $area = SolutionArea::create([
            'caption' => $request->caption,
            'src' => '/storage/' . $path,
        ]);

        return response()->json(['message' => 'Solution Area Added successfully.']);
    }

    public function DeleteSolutionArea(Request $request)
    {
        $request->validate(['id' => 'required']);
        $area = SolutionArea::findOrFail($request->id);
        // Optional: delete file from storage
        $area->delete();
        return response()->json(['message' => 'Solution Area Deleted successfully.']);
    }

}
