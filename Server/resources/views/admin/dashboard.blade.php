@extends('layout')

@section('title','General')
@section('content')
<div>
    <h2 class="sm:text-2xl lg:text-4xl font-bold uppercase bg-green-600 text-white px-4 py-2">general</h2>
</div>
<div class="flex-1 bg-white p-4 text-black ">
    {{-- header --}}
<div class="flex justify-between text-[#615d5dbf] mb-20">

    @foreach ($complaints as $key => $value)
        <div class="w-1/3 text-center">
            <h3 class="text-6xl font-semibold py-4 ">{{ $value->count }}</h3>
            <p class="uppercase">{{ $value->status }}</p>
        </div>
        @if ($key == 2)
            @break
        @else
        <span class="border-[1px] rounded-full border-[#615d5dbf]"></span>
        @endif
    @endforeach
</div>



<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {{-- Online Users --}}
    <x-box-info  title="online users - {{count($onlineUsers)}} -" willExpand='true' content_class="max-h-[25rem] overflow-auto">
        <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
            @foreach ($onlineUsers as $key => $item)
                <li>{{ $item->f_name }} {{ $item->l_name }} <<a href="{{route('user.show',$item->id)}}" class="text-blue-400 underline">{{ $item->email }}</a>>  </li>
            @endforeach
        </ul>
    </x-box-info>
        {{-- Communes --}}
    <x-box-info  title="communes" willExpand='true'>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 ">
            @foreach ($communes as $key => $item)
                <a href="{{ route('complaintsByCommune',$item->id) }}">
                    <div class="relative p-4 text-center border-[2px] border-solid rounded-lg {{ !$item->plaintes == 0 ? 'bg-green-300 ': '' }}">
                        <h3 class="font-bold">{{ $item->nom_fr }}</h3>
                        <span>{{ $item->nom_ar }}</span>
                        <span class="absolute bg-red-500 text-white font-semibold rounded-tr-lg p-[2px] px-1 top-0 right-0 " >{{ $item->plaintes }}</span>
                    </div>
                </a>
            @endforeach
        </div>
    </x-box-info>


</div>

</div>
@endsection
