<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\ContactUsLeftSideContent;
use Illuminate\Http\Request;

class ContactUsLeftSideContentController extends Controller
{
    public function GetContactUsLeftSideContent()
    {
        $content = ContactUsLeftSideContent::first();
        return response()->json($content);
    }

    public function StoreLeftSideMainContent(Request $request)
    {
        $validated = $request->validate([
            'mainCaption' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
            'address' => 'required|string|max:255',
        ]);

        ContactUsLeftSideContent::create($validated);

        return response()->json(['message' => 'Contact info stored successfully']);
    }

    public function UpdateLeftSideMainContent(Request $request)
    {
        $validated = $request->validate([
            'mainCaption' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
            'address' => 'required|string|max:255',
        ]);

        $content = ContactUsLeftSideContent::first();
        if ($content) {
            $content->update($validated);
        } else {
            ContactUsLeftSideContent::create($validated);
        }

        return response()->json(['message' => 'Contact info updated successfully']);
    }
}
