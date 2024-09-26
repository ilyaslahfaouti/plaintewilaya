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
        info($admin && Hash::check($request->password, $admin->password));
        if ($admin && Hash::check($request->password, $admin->password)) {
                Auth::guard("Admin")->login($admin);

                session()->regenerate();
                return redirect()->route('admin.dashboard');

            }

        return back()->withErrors([
            'email' => 'email or password incorrect ',
        ])->onlyInput('email');


    }

    public function logout(Request $request)
    {

    Auth::guard('Admin')->logout();
    return to_route('login');
    }

    public function register(Request $request){
        // dd($request);
        $request->validate([
            'name'=>'required|string',
            'email'=>'required|email|unique:admins',
            'password'=>'required|min:6',
        ]);

        $admin = new Admin();
        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->password = Hash::make($request->password); // Ensure password is hashed
        $admin->save();
        return to_route('admin.dashboard');
    }
    public function index()
    {
        return view('admin.dashboard');
    }
}
