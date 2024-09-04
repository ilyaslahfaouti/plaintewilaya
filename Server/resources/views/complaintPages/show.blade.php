@extends('layout')


@section('title','Plainte Détail')

@section('content')
<div class="md:overflow-auto lg:h-screen h-auto ">
    <div>
        <h2 class="text-4xl font-bold uppercase bg-green-600 text-white px-4 py-2">Plainte Détail</h2>
    </div>
        <div class="p-2  rounded-md grid md:grid-cols-2  grid-cols-1 justify-between gap-2 ">
            <div class=" p-2 bg-gray-100 rounded-md">
                <div>
                    <h4 class="p-2 font-semibold underline text-xl capitalize">utilisateur :</h4>
                    <div class="flex justify-around flex-col ps-3">
                        <p class=" capitalize  "> nom complet : <span class="font-semibold uppercase hover:text-blue-500"><a href="#">{{ $complaint->full_name}}</a></span></p>
                        <p class=" capitalize  ">commune : <span class="font-semibold">{{ $complaint->user_commune }}</span></p>
                    </div>

                </div>
                <div>
                    <h4 class="p-2 font-semibold underline text-xl capitalize">plainte :</h4>
                    <div class="flex justify-around flex-col ps-3">
                        <p class=" capitalize  "> date : {{ $complaint->date }}</p>
                        <p class=" capitalize ">commune : <span class="font-semibold">{{ $complaint->plainte_commune }}</span></p>
                    </div>

                </div>
                <div class="">
                    <h4 class="p-2 font-medium underline text-l capitalize">sujet :</h4>
                    <p class="ps-3">{{ $complaint->subject }} </p>
                </div>
                <div class="">
                    <h4 class="p-2 font-medium underline text-l capitalize ">body :</h4>
                    <p class="ps-3">
                        {{ $complaint->body }}
                    </p>
                </div>
                <div>
                    <h4 class="p-2 font-semibold underline text-l capitalize">status :</h4>
                    <p class="ps-3 {{ $complaint->status == 'Vérifié' ? 'text-green-500' :( $complaint->status == 'Annulé' ? 'text-red-500' :'') }}"> {{ $complaint->status }} </p>
                </div>

            </div>
            {!!
                !is_null($complaint->img)
                ?
                "<div class='rounded-md'>
                    <img class='rounded-md max-h-[30rem] justify-self-end' src='" . asset('images/pexels-kammeran-gonzalez-keola-3137381-26570912.jpg') . "' />
                </div>"
                :
                ''
            !!}

            @if($complaint->status == 'En Attente ...')
                <form action="{{ route('plainte.verify',$complaint->id) }}" method="POST" class="h-auto">
                    @csrf
                    @method('PUT')
                    <div class="bg-gray-100 rounded-md grid md:grid-cols-3 justify-between">
                        <div class="p-2 col-span-3">
                            <h4 class="p-2 font-semibold underline text-xl capitalize">admin réponse : </h4>
                            <textarea class="p-2 outline-none rounded-md w-[100%]" name="subject" id="inp" rows="8"></textarea>
                        </div>
                        <div class="flex gap-2 text-white p-2 w-fit capitalize">
                            <input class=" cursor-pointer px-2 py-1 bg-green-500 rounded-md hover:bg-green-600 transform hover:scale-105" type="submit" value="accept" name="action" />
                            <input class=" cursor-pointer px-2 py-1 bg-red-500 rounded-md hover:bg-red-600" type="submit" value="reject" name="action"/>
                        </div>
                    </div>
                </form>
            @else
                <div class="p-2 bg-gray-100 rounded-md justify-between">
                    <div>
                        <h4 class="p-2 font-semibold underline text-xl capitalize">admin réponse :</h4>
                        <p class="ps-3 capitalize">
                        - {{ $complaint->assignment }}
                        </p>
                    </div>
                    <div class="flex justify-end gap-1">
                        <form action="" method="POST">
                            @method('PUT')
                            <input class=" text-white capitalize px-2 py-1 bg-green-500 rounded-md hover:bg-green-600 cursor-pointer" type="submit" name="action" value="update">
                        </form>
                        <form action="" method="POST">
                            @method('delete')
                            <input class=" text-white capitalize px-2 py-1 bg-red-500 rounded-md hover:bg-red-600 cursor-pointer" type="submit" name="action" value="delete">
                        </form>
                    </div>

                </div>
                @endif

            </div>




</div>

@endsection
