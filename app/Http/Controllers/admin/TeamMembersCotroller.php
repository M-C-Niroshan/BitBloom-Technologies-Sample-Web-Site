<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMembers;
use Illuminate\Http\Request;
use Storage;

class TeamMembersCotroller extends Controller
{
    public function GetTeamMembersInfo()
    {
        $teamMembers = TeamMembers::all()->map(function ($member) {
            $member->profilePicture = Storage::url($member->profilePicture);
            return $member;
        });

        return response()->json($teamMembers);
    }

    public function StoreTeamMembersInfo(Request $request)
    {
        $validated = $request->validate([
            'profilePicture' => 'required|image',
            'fullName' => 'required|string',
            'role' => 'required|string',
        ]);

        if ($request->hasFile('profilePicture')) {
            $imagePath = $request->file('profilePicture')->store('team_members', 'public');
        }

        TeamMembers::create([
            'profilePicture' => $imagePath,
            'fullName' => $validated['fullName'],
            'role' => $validated['role'],
        ]);
        return response()->json(['message' => 'Team Member Added successfully.']);
    }

    public function UpdateTeamMembersInfo(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:team_members,id',
            'fullName' => 'required|string',
            'role' => 'required|string',
            'profilePicture' => 'nullable|image',
        ]);

        $member = TeamMembers::find($validated['id']);

        if ($request->hasFile('profilePicture')) {
            if ($member->profilePicture) {
                Storage::disk('public')->delete($member->profilePicture);
            }
            $validated['profilePicture'] = $request->file('profilePicture')->store('team_members', 'public');
        } else {
            unset($validated['profilePicture']);
        }

        $member->update($validated);

        return response()->json(['message' => 'Team Member updated successfully.']);
    }
    
    public function DeleteTeamMembersInfo(Request $request)
    {
        $request->validate(['id' => 'required|exists:team_members,id']);

        $member = TeamMembers::find($request->id);

        if ($member->profilePicture) {
            Storage::disk('public')->delete($member->profilePicture);
        }

        $member->delete();

        return response()->json(['message' => 'Team Member deleted successfully.']);
    }


}
