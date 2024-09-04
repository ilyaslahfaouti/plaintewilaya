<?php

namespace App\Http\Controllers\AdminControllers;

use App\Http\Controllers\AdminControllers\CommuneController;
use App\Http\Controllers\AdminControllers\ComplaintController;
use App\Http\Controllers\AdminControllers\UserController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class staticPagesController extends Controller
{
    public function dashboard()
    {
        $complaints = ComplaintController::getAllCpls('cpl-st-count');
        $onlineUsers = UserController::getOnlineUsers();
        $communes = CommuneController::getCommunes();

        return view('admin.dashboard',compact('complaints','onlineUsers','communes'));
    }
    static function filter_data($data , $filterQuery){
        if(empty($filterQuery)){
            return $data;
        }
        $result = array_filter($data, function ($item) use ($filterQuery) {
            foreach($item as $value){
                if(stripos($value , $filterQuery) !==false){
                    return true;
                }
            }

        });
       return ($result);
    }
}
