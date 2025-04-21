<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Storage;

class SliderController extends Controller
{
    public function SliderGet()
    {
        $sliders = Slider::all()->map(function ($slider) {
            $slider->src = Storage::url($slider->src);
            return $slider;
        });

        return response()->json($sliders);
    }

    public function SliderStore(Request $request)
    {
        $validatedData = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'description' => 'required|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('slides', 'public');
        }

        Slider::create([
            'src' => $imagePath,
            'caption' => $validatedData['description'],
        ]);

        return response()->json(['message' => 'Slider Added successfully.']);
    }

    public function SliderUpdate(Request $request){

        $validatedData = $request->validate([
            'id' => 'required|exists:sliders,id',
            'image' => 'image|mimes:jpeg,png,jpg|max:2048',
            'description' => 'required|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('slides', 'public');
        }

        $update = Slider::find($request->id);

        $update->caption = $validatedData['description'];

        if ($request->hasFile('image')) {
            $update->src = $imagePath;
        }

        $update->save();

        return response()->json(['message' => 'Slider Update successfully.']);

    }
    public function SliderDelete(Request $request){
        $validatedData = $request->validate([
            'id' => 'required|exists:sliders,id',
        ]);
        $delete = Slider::find($validatedData['id']);
        $delete->delete();

        return response()->json(['message' => 'Slider Delete successfully.']);
    }
}
