<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\MainHeader;
use Illuminate\Http\Request;

class MainHeaderController extends Controller
{

    public function MainHeaderGetInfo()
    {
        $data = MainHeader::first(); // Assuming only 1 row
        return response()->json($data);
    }

    public function MainHeaderUpdate(Request $request)
    {
        $validated = $request->validate([
            'mainTitle' => 'required|string|max:255',
            'middleTitle' => 'nullable|string|max:255',
            'headquartersAddress' => 'required|string|max:255',
            'businessInquiriesAddress' => 'required|max:255',
        ]);

        $mainHeader = MainHeader::first();
        if (!$mainHeader) {
            $mainHeader = MainHeader::create($validated);
        } else {
            $mainHeader->update($validated);
        }

        return response()->json(['message' => 'Header info updated successfully']);
    }
}
