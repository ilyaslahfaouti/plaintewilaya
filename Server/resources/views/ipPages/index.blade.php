@extends('layout')

@section('title','Adresse IPs')

@section('content')

    <div>
        <h2 class="sm:text-2xl lg:text-4xl font-bold uppercase bg-green-600 text-white px-4 py-2">les adresse IPs</h2>
    </div>
    <form method="POST" action="{{route('ip.search')}}">
        @csrf
        <div class="py-4 px-2 flex gap-2 ">
            <input type="text" id="search" placeholder="Search" value="{{ isset($searchQuery) ? $searchQuery : '' }}" name="search_query" class="border-gray-200 border-[2px] rounded-sm outline-none px-2 w-full text-[#959090]">
            <button type="submit" class="capitalize  px-3 py-1.5 rounded-md text-white bg-teal-500 hover:bg-teal-600" >search</button>

        </div>
    </form>
    <div class="max-h-fit md:max-h-[44rem]">
        <table class="w-full">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 rounded-md">
                <tr>
                    <tr>
                        <th scope="col" class="px-3 py-2 sm:px-6 sm:py-3 text-start">
                            adresse IP
                        </th>
                        <th scope="col" class="px-3 py-2 sm:px-6 sm:py-3  text-start">
                            autorisation
                        </th>

                        <th scope="col" class=" px-4 py-2 sm:px-6 sm:py-3 text-start">
                            nombre des plaintes
                        </th>
                        <th scope="col" class=" px-4 py-2 sm:px-6 sm:py-3 text-start">
                            action
                        </th>

                    </tr>
                </tr>
            </thead>
            <tbody>
                @foreach ($ips as $key => $item)
                <tr class="border-b {{ $item->is_authorize ? '' : 'text-gray-600 bg-gray-100' }}">
                    <td class="px-3 py-4 capitalize w-2/6 text-xs sm:px-6 sm:py-4 sm:text-sm">
                        {{ $item->ip_address}}
                    </td>
                    <td class="px-3 py-4 capitalize  text-xs sm:px-6 sm:py-4 sm:text-sm {{ $item->is_authorize ? 'text-green-500' : 'text-red-500' }}">
                        {{ $item->is_authorize ? 'autorisé' : 'no autorisé' }}
                    </td>
                    <td class="px-3 py-4 capitalize  text-xs sm:px-6 sm:py-4 sm:text-sm">
                        {{ $item->complaintes }}
                    </td>
                    <td class="px-3 py-4 capitalize  text-xs sm:px-6 sm:py-4 sm:text-sm">
                        <form action="{{route('ip.authorization',$item->id)}}" method="GET">

                            <button
                                @if ($item->is_authorize )
                                class="capitalize bg-red-400 rounded-md px-2 py-1 text-white hover:bg-red-500" type="submit" name="authorization" value="block">
                                ajouter à la liste noire
                                @else
                                class="capitalize bg-green-400 rounded-md px-2 py-1 text-white hover:bg-green-500" type="submit" name="authorization" value="authorize">
                                retirer de la liste noire
                                @endif
                            </button>

                        </form>

                    </td>


                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div>

    </div>



@endsection
