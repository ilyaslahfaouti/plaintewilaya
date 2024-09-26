<?php

namespace App\Http\Controllers;

use App\Models\AuthSession;
use App\Models\Plainte;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use function Laravel\Prompts\select;

class ComplaintController extends Controller
{
    public function userComplaints(Request $request){
        //  Get All Complaint For The Authenticated User ---

        $user = $request->user();
        if ($user) {
        $query = "SELECT pl.id ,pl.created_at ,pl.date ,pl.subject ,ps.status FROM plaintes pl
                  JOIN auth_sessions se on pl.auth_session_id = se.id
                  JOIN users u on u.id = se.user_id
                  JOIN plaint_status ps on ps.id = pl.status_id
                  WHERE u.id = ?";

// Execute the query and get the results
        $complaints = DB::select($query, [$user->id]);

        return response()->json($complaints);
        }
        return response()->json(['error' => ['message'=>"User not found"]], 404);
    }


    public function show(Request $request){
        //  Get All Complaint For Spicific User Using His Id ---
        try {

        $query ="SELECT pl.* ,ps.status,a_s.assignment as 'assignment'
                FROM plaintes pl
                LEFT JOIN plaint_status ps on ps.id = pl.status_id
                LEFT JOIN admin_assignments a_s on a_s.plainte_id=pl.id
                WHERE pl.id = ?";

        $complaint = DB::select($query, [$request->id]);
            return response()->json($complaint, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'plaint not found.'], 404);
        }
    }

    ////    STORE   /////
    public function store(Request $request){

        $validationRulres  = [
            'body' => 'required|string',
            'commune' => 'required',
            'date' => 'required|date',
            'subject'=>'required',
            'auth_session_id'=> 'required'
        ];

        if($request->hasFile('img')){

            $validationRulres['img'] = 'image|mimes:jpeg,png,jpg|max:2048';

        }
        $validator = Validator::make($request->all(), $validationRulres);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 420);
        }
        $validatedData = $validator->validated();

        //  get the current session
        $currentAuthSession = AuthSession::where('id', $validatedData['auth_session_id'])->latest()->first();
        $ipAuthorize = $currentAuthSession->ip->is_authorize;
        if(!$ipAuthorize){
             return response()->json(['error_message' => 'No current authentication session found'], 220);
        }

        $complaint = null;

        if($currentAuthSession){

            $complaint = new Plainte();
            $complaint->subject = $validatedData['subject'];
            $complaint->commune_id = (int) $validatedData['commune'];
            $complaint->body = $validatedData['body'];
            $complaint->date = $validatedData['date'];
            $complaint->auth_session_id = $currentAuthSession->id;

            if($request->hasFile('img')){
                $file = $request->file('img');
                $complaint->img = $file->store('images', 'public');

            }
            $complaint->save();

        }else{
            return response()->json(['error' => 'No current authentication session found'], 401);
        }

        return response()->json([
            'message' => 'The Complaint Created Seccessfuly',
            'complaint'=>$complaint,
        ], 201);


    }
}
