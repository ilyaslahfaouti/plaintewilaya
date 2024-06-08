<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        
        
        $validator = Validator::make($request->all(), [
            'f_name' => 'required|string|max:255',
            'l_name' => 'required|string|max:255',
            'tel' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'commune' =>'required',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 420);
        }
        $validatedData = $validator->validated();
        
        $user = User::create([
            'f_name' => $validatedData['f_name'],
            'l_name' => $validatedData['l_name'],
            'email' => $validatedData['email'],
            'commune' => (int) $validatedData['commune'],
            'tel' => $validatedData['tel'],
            'password' => $validatedData['password'],
            'email_verified'=>false,
        ]); 
        /** @var User $user */
        Auth::login($user);

        
        return response()->json([
            'message' => 'User registered and logged in successfully',
            'token' => $user->createToken('API TOKEN')->plainTextToken,
        ], 201);

    }
    public function get_current_user(){

        $user = auth()->user();
 
        return response()->json([
            'user'=>$user,
        ],200);
    
    }
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $validatedData = $validator->validated();
        if (!Auth::attempt($validatedData)) {
            
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('API TOKEN')->plainTextToken;

        
        
        return response()->json([
            'message' => 'User registered and logged in successfully',
            'user' => $user,
            'token'=>$token,
        ], 201);
        
    
    }
    public function logout(Request $request) {
        $user = $request->user();
            $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
            return response('logout seccess', 204);
    }

    public function sendEmailVerification(Request $request){

        /** @var User $user */
        $user = $request->user();
        // $user->email_verified = true;
        // dump($user);
        
    }
}
