<?php

namespace App\Http\Controllers\AdminControllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\AdminControllers\IpController;
use App\Http\Controllers\AdminControllers\staticPagesController;


class UserController extends Controller
{
    public function index (){
        $users = $this->getAllUsers();
        return view('userPages.index',compact('users'));
    }

    public function show(User $user){
        $userInfo = $this->getUser($user->id);
        $userIps = IpController::userIps($user->id);

        return view('userPages.show',compact('userInfo' ,'userIps'));

    }
    public function search(Request $request){
        $searchQuery = $request->search_query;
        $data = $this->getAllUsers();
        $users = staticPagesController::filter_data($data,$searchQuery);
        return view('userPages.index',compact('users','searchQuery'));
    }




    static function getOnlineUsers(){
        $onlineUsersQuery = "SELECT u.id, u.f_name AS 'f_name' , u.l_name as 'l_name', u.email as 'email'
                FROM   auth_sessions a_s JOIN users u
                on a_s.user_id = u.id
                WHERE a_s.date_disconnected IS NULL";
        $onlineUsers = DB::select($onlineUsersQuery);
        return $onlineUsers;

    }

    static function getUser($id){
        $userQuery = 'SELECT u.id, CONCAT(u.f_name," ",u.l_name) AS "full_name" , u.tel ,u.email  ,
                u.email_verified_at AS "email_verified", u.created_at,
                CONCAT(c.nom_fr," ",c.nom_ar) AS "commune" , COUNT(p.id) AS "complaintes_counts"
                from users u
                left JOIN communes c on c.id = u.commune
                left JOIN auth_sessions a_s ON a_s.user_id = u.id
                left JOIN plaintes p on a_s.id = p.auth_session_id
                where u.id = ?
                GROUP by  u.created_at, u.email_verified_at, u.id ,c.nom_ar, u.tel ,u.email,u.l_name ,u.f_name, a_s.user_id ,c.nom_fr';
        $user = DB::select($userQuery,[$id])[0];
        return $user;
    }
    static function getAllUsers(){
        $usersQuery = 'SELECT u.id, CONCAT(u.f_name," ",u.l_name) AS "full_name" , u.tel ,u.email ,
                CONCAT(c.nom_fr," ",c.nom_ar) AS "commune" , COUNT(p.id) AS "complaintes_counts"
                from users u
                left JOIN communes c on c.id = u.commune
                left JOIN auth_sessions a_s ON a_s.user_id = u.id
                left JOIN plaintes p on a_s.id = p.auth_session_id
                GROUP by  u.id ,c.nom_ar, u.tel ,u.email,u.l_name ,u.f_name, a_s.user_id ,c.nom_fr';
        $users = DB::select($usersQuery);
        return $users;
    }
}
