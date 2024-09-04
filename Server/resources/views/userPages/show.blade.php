
@extends('layout')


@section('title','Utilisateur Détail')

@section('content')
<div>
    <div>
        <h2 class="text-4xl font-bold uppercase bg-green-600 text-white px-4 py-2">Utilisateur Détail</h2>
    </div>
    <div class=" m-2 p-2 bg-gray-100 rounded-md">
        <div>
            <h4 class="p-2 font-semibold underline text-xl capitalize">l'utilisateur :</h4>
            <div class="flex justify-around flex-col ps-3">
                <p class=" capitalize  ">le nom complet : <span class="font-semibold uppercase hover:text-blue-500"><a href="#">{{ $userInfo->full_name}}</a></span></p>
                <p class=" capitalize  ">le telephone : <span class="font-semibold">{{ $userInfo->tel }}</span></p>
                <p class="">l'email address : <span class="font-semibold">{{ $userInfo->email }}</span> <span class="text-gray-600">({{$userInfo->email_verified ? 'vérifié': 'non vérifié'}})</span></p>
                <p class=" capitalize  ">la commune : <span class="font-semibold">{{ $userInfo->commune }}</span></p>
                <p class=" capitalize  ">créé en : <span class="font-semibold">{{ \Carbon\Carbon::parse($userInfo->created_at)->format('d/m/Y')  }}</span></p>
                <div class="capitalize">
                    <p>les ips de connexion :</p>
                    <div>
                        <ul class=" ps-4 list-disc list-inside">
                            @foreach ($userIps as $item )
                                <li class="capitalize">{{ $item->ip_address}} <span class="text-w-600">( {{$item->is_authorize == 1 ? 'autorisé' : 'no autorisé'}} )</span></li>
                            @endforeach
                            @if (count($userIps) === 0 )
                                <li class="capitalize"><< non connectés >></li>
                            @endif
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <div>
            <h4 class="p-2 font-semibold underline text-xl capitalize">les plaintes :</h4>
            <div class="flex justify-around flex-col ps-3">
                <p class=" capitalize  "> le nombre des plaintes : <span class="text-blue-500">{{ $userInfo->complaintes_counts}}</span></p>
            </div>

        </div>

    </div>

    </div>
@endsection
