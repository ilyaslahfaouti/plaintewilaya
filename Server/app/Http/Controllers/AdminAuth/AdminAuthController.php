<?php

namespace App\Http\Controllers\AdminAuth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminAuthController extends Controller
{



    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $admin = Admin::where('email', $request->email)->first();
        if ($admin && Hash::check($request->password, $admin->password)) {
                Auth::login($admin);
                session()->regenerate();
                return redirect()->route('admin.dashboard');

            }

        return back()->withErrors([
            'email' => 'email or password incorrect ',
        ])->onlyInput('email');


    }

    public function logout(Request $request)
    {

    Auth::logout();
    return to_route('login');
    }

    public function store(Request $request){


        $admin = new Admin();
        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->password = Hash::make($request->password); // Ensure password is hashed
        $admin->save();
        return to_route('login');
    }
    public function index()
    {
        return view('admin.dashboard');
    }
}
