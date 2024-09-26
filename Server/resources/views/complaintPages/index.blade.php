@extends('layout')

@section('title','Les Plaintes')

@section('content')

    <div>
        <h2 class="sm:text-2xl lg:text-4xl font-bold uppercase bg-green-600 text-white px-4 py-2">les plaintes</h2>
    </div>
    <form method="POST" action="{{route("complaints.search")}}">
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
                        <th scope="col" class="px-4 py-2 sm:px-6 sm:py-3 text-start">
                            nom complet
                        </th>
                        <th scope="col" class="px-4 py-2 sm:px-6 sm:py-3  text-start">
                            sujet
                        </th>
                        <th scope="col" class="px-4 py-2 sm:px-6 sm:py-3 text-start">
                            status
                        </th>
                        <th scope="col" class="px-4 py-2 sm:px-6 sm:py-3 text-start">
                            commune
                        </th>
                    </tr>
                </tr>
            </thead>
            <tbody>
                @foreach ($complaints as $key => $item)
                <tr class="border-b {{ $item->status == 'traitement' ? 'bg-green-200 hover:bg-green-300' : '' }} hover:bg-gray-100 cursor-pointer" onclick="window.location='{{ route('complaint.show',$item->id) }}'">
                    <td class="px-6 py-4 capitalize w-1/12 text-xs sm:px-6 sm:py-4 sm:text-sm">
                        {{ $item->full_name }}
                    </td>

                    <td class="px-6 py-4 capitalize  text-xs sm:px-6 sm:py-4 sm:text-sm">
                        {{ $item->subject }}

                    </td>
                    <td class="px-4 py-2 capitalize w-1/6 sm:px-6 sm:py-4  {{ $item->status == 'vérifié' ? 'text-green-400':( $item->status == 'annulé' ? 'text-red-400' : '')  }}">

                        {{ $item->status  }}

                    </td>
                    <td class="px-4 py-2 capitalize w-1/6 sm:px-6 sm:py-4">
                        {{ $item->commune  }}

                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div>

    </div>



@endsection
