<?php

namespace App\Http\Controllers\AdminControllers;

use App\Models\Plainte;
use Illuminate\Http\Request;
use App\Models\AdminAssignment;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\AdminControllers\staticPagesController;

class ComplaintController extends Controller
{
    public function index() {
        $complaints = $this->getAllCpls('cpl-st-user-cm');

        return view('complaintPages.index', compact('complaints'));
    }
    public function show (Plainte $plainte){
        $complaint = $this->getCpl($plainte->id,$plainte->status_id);


        return view('complaintPages.show',compact('complaint'));
    }


    public function getCplByCmId(Request $request) {
        $id = $request->id;
        $plaintQuery = "SELECT CONCAT(u.f_name, ' ', u.l_name) AS 'full_name', p.id, p.body , p.subject ,p.date , p.img , ps.status ,cm.nom_fr as 'commune'
                                    FROM plaintes p
                                    JOIN auth_sessions a
                                    ON a.id = p.auth_session_id
                                    JOIN users u
                                    on a.user_id = u.id
                                    JOIN plaint_status ps ON p.status_id = ps.id
                                    JOIN communes cm ON cm.id = p.commune_id
                                    AND cm.id = ?
                                    ";

        $complaints = DB::select($plaintQuery,[$id]);
        return view('complaintPages.index', compact('complaints'));
    }

    public function search(Request $request){
        $searchQuery = $request->search_query;
        $data = $this->getAllCpls('cpl-st-user-cm');
        $complaints = staticPagesController::filter_data($data,$searchQuery);
        return view('complaintPages.index',compact('complaints',"searchQuery"));

    }

    public function verifyPlainte(Plainte $plainte,Request $request){
        $plainteId = $plainte->id;
        $adminId = auth()->id();
        $action = $request->action;
        $subject = $request->subject;

        if($this->makeAssignment($plainteId,$adminId,$subject)['state']){
            if($action == 'accept'){
                $plainte->status_id = 2;
            }else{
                $plainte->status_id = 3;
            }
            $plainte->save();
        }else{
            return to_route('admin.dashboard');
        }
        return to_route('admin.dashboard')->with('la plainte a été mise à jour');
    }







    static function makeAssignment($plainteId,$adminId,$subject){
        $exists = AdminAssignment::where('plainte_id',$plainteId)->exists();

        if(!$exists){
            $admin_assignment = new AdminAssignment();
            $admin_assignment->plainte_id = $plainteId;
            $admin_assignment->admin_id =$adminId ;
            $admin_assignment->assignment =$subject ;
            $admin_assignment->save();
            return ["state"=>true];

        }else{
            return ["state"=>false,'message'=>'déjà vérifié'];
        }
    }
    static function getCpl($id,$status_id){
        if(!is_null($id)){

            $query = "SELECT p.id ,p.date ,p.subject,p.body,p.img ,ps.status as 'status',
                        CONCAT(pcm.nom_fr , ' ',pcm.nom_ar) as 'plainte_commune' ,
                        CONCAT(u.f_name , ' ',u.l_name) as 'full_name' ,
                        CONCAT(ucm.nom_fr ,' ',ucm.nom_ar) as 'user_commune'
                            FROM plaintes p
                        JOIN plaint_status ps on ps.id = p.status_id
                        JOIN auth_sessions ath on ath.id = p.auth_session_id
                        JOIN users u on u.id = ath.user_id
                        JOIN communes ucm on ucm.id = u.commune
                        JOIN communes pcm on pcm.id = p.commune_id
                        WHERE p.id = ?";
            $query2 = "SELECT a_as.assignment,  p.id ,p.date ,p.subject,p.body,p.img ,ps.status as 'status',
                        CONCAT(pcm.nom_fr , ' ',pcm.nom_ar) as 'plainte_commune' ,
                        CONCAT(u.f_name , ' ',u.l_name) as 'full_name' ,
                        CONCAT(ucm.nom_fr ,' ',ucm.nom_ar) as 'user_commune'
                            FROM plaintes p
                        JOIN plaint_status ps on ps.id = p.status_id
                        JOIN auth_sessions ath on ath.id = p.auth_session_id
                        JOIN users u on u.id = ath.user_id
                        JOIN communes ucm on ucm.id = u.commune
                        JOIN communes pcm on pcm.id = p.commune_id
                        JOIN admin_assignments a_as on a_as.plainte_id = p.id
                        where p.id = ?";
            $complaint =null;
            if($status_id == 1){
                $complaint = DB::select($query,[$id])[0];

            }else{
                $complaint = DB::select($query2,[$id])[0];
            }
            return $complaint;
        }else{
            return -1;
        }
    }

    static function getAllCpls($type = 'cpl-st') {
        $plaintQuery = '';

        switch ($type) {
            case "cpl":
                $plaintQuery = "SELECT * FROM plaintes";
                break;
                case 'cpl-st':
                    $plaintQuery = "SELECT p.*, ps.status
                                    FROM plaintes p
                                    JOIN plaint_status ps
                                    ON p.status_id = ps.id";
                    break;
                case 'cpl-st-user':
                    $plaintQuery = "SELECT p.*, ps.status,
                                    CONCAT(u.f_name, ' ', u.l_name) as 'full_name'
                                    from plaintes p
                                    JOIN plaint_status ps
                                    on p.status_id = ps.id
                                    JOIN auth_sessions a
                                    ON a.id = p.auth_session_id
                                    JOIN users u
                                    on a.user_id = u.id";
                    break;

                case 'cpl-st-count':
                    $plaintQuery = "SELECT ps.status, count(p.id) AS 'count'
                                    FROM plaintes p
                                    RIGHT JOIN plaint_status ps
                                    ON ps.id = p.status_id
                                    GROUP BY ps.status";
                    break;
                case 'cpl-st-user-cm':
                    $plaintQuery = "SELECT p.*, ps.status, cm.nom_fr as 'commune',
                                    CONCAT(u.f_name, ' ', u.l_name) as 'full_name'
                                    from plaintes p
                                    JOIN plaint_status ps
                                    on p.status_id = ps.id
                                    JOIN auth_sessions a
                                    ON a.id = p.auth_session_id
                                    JOIN users u
                                    on a.user_id = u.id
                                    JOIN communes cm
                                    ON cm.id = p.commune_id";
                    break;
            default:
                break;
        }

        $complaints = DB::select($plaintQuery);
        return $complaints;
    }
}
