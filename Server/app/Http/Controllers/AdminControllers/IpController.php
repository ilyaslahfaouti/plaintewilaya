<?php

namespace App\Http\Controllers\AdminControllers;

use App\Models\Ip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\AdminControllers\staticPagesController;

class IpController extends Controller
{
    public function index (){
        $ips = $this->getAllIps();
        return view('ipPages.index',compact('ips'));
    }

    public function authorization(Ip $ip,Request $request){
        $action = $request->authorization;
        if($action == 'block'){
            $ip->is_authorize = 0;
        }elseif($action == 'authorize'){
            $ip->is_authorize = 1 ;
        }
        $ip->save();
        return to_route('ip.index');
    }
    public function search(Request $request){
        $searchQuery = $request->search_query;
        $data = $this->getAllIps();
        $ips = staticPagesController::filter_data($data,$searchQuery);
        return view('ipPages.index',compact('ips','searchQuery'));
    }

    static function getAllIps(){
        $query = 'SELECT ips.id, ips.ip_address,ips.is_authorize ,COUNT(p.id) as "complaintes"
                from  ips
                LEFT JOIN auth_sessions a_s on a_s.ip_id = ips.id
                LEFT JOIN plaintes p ON p.auth_session_id = a_s.id
                GROUP BY ips.id, ips.is_authorize, ips.ip_address';
        $ips = DB::select($query);
        return $ips;

    }

    static function userIps($id){
        $userQuery = 'SELECT ips.ip_address ,ips.is_authorize from ips
                    JOIN auth_sessions a_s ON a_s.ip_id = ips.id
                    JOIN users u on u.id = a_s.user_id
                    where u.id = ?';
        $user = DB::select($userQuery,[$id]);
        return $user;
    }
}
