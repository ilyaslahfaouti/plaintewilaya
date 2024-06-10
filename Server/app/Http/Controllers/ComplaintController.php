<?php

namespace App\Http\Controllers;

use App\Models\Plainte;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ComplaintController extends Controller
{
    public function index(){
        $complaints = Plainte::all();
        return response()->json([
            'plaints'=>$complaints,
        ]);
    }
    public function specific(Request $request){

        $user = $request->user();
        if ($user) {
            $complaints = $user->plaints;
            return response()->json($complaints);
        }
        return response()->json(['error' => ['message'=>"User not found"]], 404);
    }

    public function store(Request $request){
        $user = $request->user();
        $validationRulres  = [
            'body' => 'required|string',
            'date' => 'required|date',
            'subject'=>'required',
            'commune'=>['required',
                function ($att ,$val ,$fail) use ($user) {
                    if((int) $val !== (int) $user->commune){
                        $fail("your are not allowed to add complaint for other commune");
                    }
                }
            ]
        
            ];
        
            
        if($request->hasFile('img')){
                
            $validationRulres['img'] = 'sometimes|image|mimes:jpeg,png,jpg|max:2048';
            
        }
        $validator = Validator::make($request->all(), $validationRulres);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 420);
        }
        $validatedData = $validator->validated();

        $complaint = new Plainte();
        $complaint->user_id = (int) $user->id;
        $complaint->commune = (int) $validatedData['commune'];
        $complaint->subject = $validatedData['subject'];
        $complaint->body = $validatedData['body'];
        $complaint->date = $validatedData['date'];

        if($request->hasFile('img')){
            $complaint->img = $request->file('img')->store('images', 'public');
        }
        $complaint->save();
        
        
        return response()->json([
            'message' => 'The Complaint is created successfully',
            'complaint'=>$complaint,
            
        ], 201);
    }
}
