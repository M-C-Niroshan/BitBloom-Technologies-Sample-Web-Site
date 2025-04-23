<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\FooterContent;
use Illuminate\Http\Request;

class footerController extends Controller
{
    public function GetFooterContent(Request $request)
    {
        $footer = FooterContent::first();

        if (!$footer) {
            return response()->json([
                'notExists' => true,
                'data' => null,
            ]);
        }

        return response()->json($footer);
    }

    public function StoreFooterContent(Request $request)
    {
        $validated = $request->validate([
            'companyName' => 'required|string',
            'leftSideCaption' => 'required|string',
            'facebookURL' => 'nullable|string',
            'twitterURL' => 'nullable|string',
            'linkdinURL' => 'nullable|string',
            'instagramURL' => 'nullable|string',
            'headquartersAddress' => 'required|string',
            'inquiriesMailAddress' => 'required|email',
            'contactNumber' => 'required|string',
            'bottomCaption' => 'required|string',
        ]);

        FooterContent::create($validated);
        return response()->json(['message' => 'Footer created successfully.']);
    }

    public function UpdateFooterContent(Request $request)
    {
        $validated = $request->validate([
            'companyName' => 'nullable|string',
            'leftSideCaption' => 'nullable|string',
            'facebookURL' => 'nullable|string',
            'twitterURL' => 'nullable|string',
            'linkdinURL' => 'nullable|string',
            'instagramURL' => 'nullable|string',
            'headquartersAddress' => 'nullable|string',
            'inquiriesMailAddress' => 'nullable|email',
            'contactNumber' => 'nullable|string',
            'bottomCaption' => 'nullable|string',
        ]);

        $footer = FooterContent::first();
        if (!$footer) {
            FooterContent::create($validated);
            return response()->json(['message' => 'No existing footer found.'], 404);
        }

        $footer->update($validated);
        return response()->json(['message' => 'Footer updated successfully.']);
    }
}
