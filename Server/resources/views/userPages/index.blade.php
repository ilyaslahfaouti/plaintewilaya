@extends('layout')

@section('title','Les Utilisatuers')

@section('content')

    <div>
        <h2 class="text-4xl font-bold uppercase bg-green-600 text-white px-4 py-2">les utilisatuers</h2>
    </div>
    <form method="POST" action="{{route('user.search')}}">
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
                            nom complet
                        </th>
                        <th scope="col" class="px-3 py-2 sm:px-6 sm:py-3  text-start">
                            telephone
                        </th>
                        <th scope="col" class="px-3 py-2 sm:px-6 sm:py-3 text-start">
                            email
                        </th>
                        <th scope="col" class="px-3 py-2 sm:px-6 sm:py-3 text-start">
                            commune
                        </th>
                        <th scope="col" class="hidden md:block px-4 py-2 sm:px-6 sm:py-3 text-start">
                            nombre des plaintes
                        </th>
                    </tr>
                </tr>
            </thead>
            <tbody>
                @foreach ($users as $key => $item)
                <tr class="border-b  hover:bg-gray-100 cursor-pointer" onclick="window.location='{{route('user.show',$item->id)}}'">
                    <td class="px-3 py-4 capitalize w-2/6 text-xs sm:px-6 sm:py-4 sm:text-sm">
                        {{ $item->full_name }}
                    </td>

                    <td class="px-3 py-4 capitalize  text-xs sm:px-6 sm:py-4 sm:text-sm">
                        {{ $item->tel }}

                    </td>
                    <td class="px-3 py-4 w-2/6 sm:px-6 sm:py-4 ">

                        {{ $item->email}}

                    </td>
                    <td class="px-3 py-4 capitalize w-1/6 sm:px-6 sm:py-4">
                        {{ $item->commune  }}

                    </td>
                    <td class="hidden md:block px-2 py-4 capitalize w-3/6  sm:px-6 sm:py-4">
                        {{ $item->complaintes_counts }}

                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div>

    </div>



@endsection
