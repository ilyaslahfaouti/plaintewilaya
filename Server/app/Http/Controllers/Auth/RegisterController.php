<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
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
            return response()->json(['errors' => $validator->errors()], 422);
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

        Auth::login($user);

        // Return a JSON response indicating success
        return response()->json([
            'message' => 'User registered and logged in successfully',
            'user' => $user,
        ], 201);

    }
}
