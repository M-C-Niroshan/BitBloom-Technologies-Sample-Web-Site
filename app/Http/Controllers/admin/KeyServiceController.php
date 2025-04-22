<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\KeyServices;
use Illuminate\Http\Request;

class KeyServiceController extends Controller
{
    public function GetKeyServiceInfo()
    {
        $services = KeyServices::with('captions')->get();
        return response()->json($services);
    }

    public function StoreKeyServices(Request $request)
    {
        $validated = $request->validate([
            'mainTitle' => 'required|string',
            'captions' => 'required|array',
            'captions.*' => 'required|string',
        ]);

        $service = KeyServices::create([
            'mainTitle' => $validated['mainTitle'],
        ]);

        foreach ($validated['captions'] as $caption) {
            $service->captions()->create(['caption' => $caption]);
        }

        return response()->json(['message' => 'Key Service added successfully.']);
    }

    public function UpdateKeyServices(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:key_services,id',
            'mainTitle' => 'required|string',
            'captions' => 'required|array',
            'captions.*' => 'required|string',
        ]);

        $service = KeyServices::findOrFail($validated['id']);
        $service->update(['mainTitle' => $validated['mainTitle']]);

        // Delete existing captions
        $service->captions()->delete();

        // Add new captions
        foreach ($validated['captions'] as $caption) {
            $service->captions()->create(['caption' => $caption]);
        }

        return response()->json(['message' => 'Key Service updated successfully.']);
    }

    public function DeleteKeyServices(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:key_services,id',
        ]);

        $service = KeyServices::findOrFail($validated['id']);
        $service->delete();

        return response()->json(['message' => 'Key Service deleted successfully.']);
    }
}
