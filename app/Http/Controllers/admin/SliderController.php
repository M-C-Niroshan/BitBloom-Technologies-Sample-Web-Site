<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public function SliderIndex()
    {
        return inertia('admin/customize-home/customize-home-slider');
    }
    public function SliderStore(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'description' => 'required|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('slides', 'public');
        }

        Slider::create([
            'src' => $imagePath,
            'caption' => $request->description,
        ]);

        return response()->json(['message' => 'Slider added successfully.']);
    }
}
