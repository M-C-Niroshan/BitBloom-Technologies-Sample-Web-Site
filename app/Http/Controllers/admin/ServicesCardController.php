<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\ServicesCards;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServicesCardController extends Controller
{
    public function GetServicecardInfo()
    {
        $serviceCards = ServicesCards::all()->map(function ($serviceCard) {
            $serviceCard->src = Storage::url($serviceCard->src);
            return $serviceCard;
        });
        return response()->json($serviceCards);
    }

    public function StoreServiceCard(Request $request)
    {
        $validatedData = $request->validate([
            'mainTitle' => 'required|string',
            'subTitle' => 'required|string',
            'captions' => 'nullable|array',
            'src' => 'required|file|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        if ($request->hasFile('src')) {
            $imagePath = $request->file('src')->store('service-card-images', 'public');
        }

        ServicesCards::create([
            'mainTitle' => $validatedData['mainTitle'],
            'subTitle' => $validatedData['subTitle'],
            'captions' => $validatedData['captions'],
            'src' => $imagePath,
        ]);
        return response()->json(['message' => 'Service Card Added successfully.']);

    }

    public function UpdateServiceCard(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|exists:services_cards,id',
            'mainTitle' => 'required|string',
            'subTitle' => 'required|string',
            'captions' => 'nullable|array',
            'src' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        $card = ServicesCards::findOrFail($validatedData['id']);

        if ($request->hasFile('src')) {
            $imagePath = $request->file('src')->store('service-card-images', 'public');

            $card->update([
                'mainTitle' => $validatedData['mainTitle'],
                'subTitle' => $validatedData['subTitle'],
                'captions' => $validatedData['captions'],
                'src' => $imagePath,
            ]);
        }
         else {
            unset($validatedData['src']);
            $card->update($validatedData);
        }
        return response()->json(['message' => 'Service Card Updated successfully.']);
    }

    public function DeleteServiceCard(Request $request)
    {
        $request->validate(['id' => 'required|exists:services_cards,id']);
        $card = ServicesCards::findOrFail($request->id);
        $card->delete();
        return response()->json(['message' => 'Service Card Deleted successfully.']);
    }
}
