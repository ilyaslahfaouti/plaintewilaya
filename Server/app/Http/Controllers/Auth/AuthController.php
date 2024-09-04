<?php

namespace App\Http\Controllers\Auth;

use App\Models\Ip;
use App\Models\User;
use App\Models\AuthSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
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



            ////  login  ////
    public function login(Request $request){
        $validator = Validator::make($request->all(), [

            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {

            return response()->json(['errors' => $validator->errors()], 401); ///////////
        }
        $validatedData = $validator->validated();
        $ip = Ip::firstOrCreate(['ip_address' => $request->ip()]);
        if (!$ip->is_authorize) {
            return response()->json(['message' => "il y a un problème avec le processus de connexion s'il vous plaît essayer à nouveau plus tard" ], 401);
        }
        if (!Auth::attempt($validatedData)) {

            return response()->json([
                'message' => 'Invalid credentials',
            ], 401); ////////
        }

        /** @var User $user */
        $user = Auth::user();
        $user->tokens()->delete();
        $token = $user->createToken('authToken')->plainTextToken;
        session()->regenerate();
        $session_id = $this->make_session( $ip,$user);



        return response()->json([
            'message' => 'User logged in successfully',
            'token'=>$token,
            'user' => $user,
            'session_id'=>$session_id,
        ], 201); ///////////
    }

         /////  LOGOUT  /////
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

            session()->invalidate();
            session()->regenerateToken();
            return response()->json([
                'message' => 'test -- test'
            ], 200);    //////////
    }
        /////   EMAIL VERIFICATION  /////
    public function sendEmailVerification(Request $request){

        /** @var User $user */
        $user = $request->user();
        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified'], 200);
        }

        $user->sendEmailVerificationNotification();
        return response()->json([
            'message' => 'Verification email sent'
        ], 200); ////////
    }

    public function verify(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified'], 400);
        }

        $user->markEmailAsVerified();
        return redirect('http://localhost:3000/dashbord');  ////////
    }

    public function ipAuthorization(Request $request){
        $authSession_id = $request->id;
        $query = 'SELECT ips.*
                FROM  auth_sessions a_s
                JOIN ips on ips.id = a_s.ip_id
                WHERE a_s.id = ?';
        $ipAuthorization = DB::select($query,[$authSession_id])[0];
        return response()->json([
            'ipAuthorization' => $ipAuthorization->is_authorize,
        ], 200);
    }

    public function make_session($ip,$user){


        $newSession = AuthSession::create([
            'user_id' => $user->id,
            'ip_id' => $ip->id,
            'date_connected' => now(),
        ]);
        return $newSession->id;
    }

}
