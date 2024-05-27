<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VerificationEmail extends Controller
{
     // Validation de l'e-mail
     public function validation($token)
     {
         // Récupérer l'utilisateur avec le token donné
         $user = Utilisateur::where('token', $token)->first();
 
         if (!$user) {
             return response()->json(['message' => 'Token invalide'], 400);
         }
 
         // Générer et enregistrer un code de vérification unique pour cet utilisateur
         $verificationCode = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
         $user->verification_code = $verificationCode;
         $user->save();
 
         // Envoyer le code de vérification à l'utilisateur (par e-mail, SMS, etc.)
 
         return response()->json(['message' => 'Code de vérification envoyé.']);
     }
 
     // Vérification du code de vérification
     public function verification(Request $request)
     {
         // Valider les données de vérification
         $request->validate([
             'token' => 'required',
             'verification_code' => 'required|digits:6'
         ]);
 
         // Trouver l'utilisateur avec le token
         $user = Utilisateur::where('token', $request->token)->first();
 
         if (!$user) {
             return response()->json(['message' => 'Token invalide'], 400);
         }
 
         // Vérifier le code de vérification
         if ($user->verification_code != $request->verification_code) {
             return response()->json(['message' => 'Code de vérification invalide'], 400);
         }
 
         // Marquer l'utilisateur comme vérifié
         $user->email_verified_at = now();
         $user->save();
 
         return response()->json(['message' => 'E-mail vérifié avec succès.']);
        }
}
