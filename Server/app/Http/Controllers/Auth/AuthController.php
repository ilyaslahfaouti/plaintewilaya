<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use App\Http\Requests\RegisterRequest;
use App\Models\AuthSession;
use App\Models\Ip;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
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
            return response()->json(['errors' => $validator->errors()], 420);   ///////
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
        $session_id = $this->make_session($request->ip(),$user);
        return response()->json([
            'message' => 'User registered and logged in successfully',
            'token' => $user->createToken('API TOKEN')->plainTextToken,
            'session'=>$session_id,
        ], 201);    ////////////

    }
    public function get_current_user(){

        $user = auth()->user();
 
        return response()->json([
            'user'=>$user,
        ],200);
    
    }

            ////  login    ////
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            
            return response()->json(['errors' => $validator->errors()], 401); ///////////
        }
        $validatedData = $validator->validated();
        if (!Auth::attempt($validatedData)) {
            
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401); ////////
        }

        /** @var User $user */
        $user = Auth::user();
        $user->tokens()->delete();
        $token = $user->createToken('authToken')->plainTextToken;
        $request->session()->regenerate();
        
            ///////////
        $session_id = $this->make_session($request->ip(),$user);



        return response()->json([
            'message' => 'User logged in successfully',
            'user' => $user,
            'token'=>$token,
            'session'=>$session_id,

        ], 201);
        
    
    }

    public function logout(Request $request) {
        $user = $request->user();
        if ($user) {
            $user->tokens()->where('tokenable_id', $user->id)->delete();

            // Update the auth session record
            AuthSession::where('user_id', $user->id)
                ->whereNull('date_disconnected')
                ->update(['date_disconnected' => now()]);
        }
            
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return response()->json([
                'message' => 'test -- test'
            ], 200);
    }

    public function sendEmailVerification(Request $request){

        /** @var User $user */
        $user = $request->user();
        // $user->email_verified = true;
        // dump($user);
        
    }
    
    public function make_session($ipAddress,$user){
        
        $ip = Ip::firstOrCreate(['ip_address' => $ipAddress]);
        if (!$ip->is_authorize) {
            return response()->json(['message' => 'IP address is not authorized'], 403);
        }
        $newSession = AuthSession::create([
            'user_id' => $user->id,
            'ip_id' => $ip->id,
            'date_connected' => now(),
        ]);
        return $newSession->id;
    }
}
