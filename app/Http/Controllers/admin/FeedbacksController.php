<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Feedbacks;
use Illuminate\Http\Request;

class FeedbacksController extends Controller
{
    public function GetFeedbacksInfo()
    {
        return response()->json(Feedbacks::all());
    }
    public function StoreFeedbacks(Request $request)
    {
        $request->validate([
            'fullName' => 'required',
            'role' => 'required',
            'companyName' => 'required',
            'caption' => 'required',
            'src' => 'required|image|max:2048',
            'isShow' => 'required',
        ]);

        $path = $request->file('src')->store('feedbacks', 'public');

        Feedbacks::create([
            'fullName' => $request->fullName,
            'role' => $request->role,
            'companyName' => $request->companyName,
            'caption' => $request->caption,
            'isShow' => $request->isShow,
            'src' => '/storage/' . $path,
        ]);
        return response()->json(['message' => 'Feedback added successfully.']);
    }
    public function UpdateFeedbacks(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:feedbacks,id',
            'isShow' => 'required|boolean',
        ]);

        $feedback = Feedbacks::findOrFail($request->id);
        $feedback->isShow = $request->isShow;
        $feedback->save();

        return response()->json(['message' => 'Feedback visibility updated successfully.']);
    }
    public function DeleteFeedbacks(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);

        $feedback = Feedbacks::findOrFail($request->id);

        $feedback->delete();
        return response()->json(['message' => 'Feedback Deleted successfully.']);
    }
}
