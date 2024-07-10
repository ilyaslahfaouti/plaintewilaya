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
    public function index(){
        $complaints = Plainte::all();
        return response()->json([
            'plaints'=>$complaints,
        ]);
    }
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
        $query ="SELECT pl.* ,ps.status FROM plaintes pl 
        JOIN plaint_status ps on ps.id = pl.status_id 
        WHERE pl.id = ?";
        $complaint = DB::select($query, [$request->id]);
            return response()->json($complaint, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'plaint not found.'], 404);
        }


    }

    public function store(Request $request){
        $validationRulres  = [
            'body' => 'required|string',
            'date' => 'required|date',
            'subject'=>'required',
            ];
        
            
        if($request->hasFile('img')){
                
            $validationRulres['img'] = 'image|mimes:jpeg,png,jpg|max:2048';
            
        }
        $validator = Validator::make($request->all(), $validationRulres);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 420);
        }
        $validatedData = $validator->validated();

        //  get the current session id 
        $currentAuthSession = AuthSession::where('user_id', auth()->id())->latest()->first();

        //  Complaint 
        $complaint = new Plainte();
        $complaint->subject = $validatedData['subject'];
        $complaint->body = $validatedData['body'];
        $complaint->date = $validatedData['date'];
        $complaint->auth_session_id = $currentAuthSession->id;

        if($request->hasFile('img')){
            $file = $request->file('img');
            $complaint->img = $file->store('images', 'public');
            
        }
        $complaint->save();
        //  End Complaint
        
        return response()->json([
            'message' => 'The Complaint Created Seccessfuly',
            'complaint'=>$complaint,
        ], 201);
        
        
    }
}
