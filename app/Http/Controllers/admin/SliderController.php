<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Storage;

class SliderController extends Controller
{
    public function SliderIndex()
    {
        $sliders = Slider::all()->map(function ($slider) {
            $slider->src = Storage::url($slider->src); // e.g., /storage/slides/filename.jpg
            return $slider;
        });

        return response()->json($sliders);
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
