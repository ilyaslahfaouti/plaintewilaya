@extends('layout')

@section('title','cree un admin')
@section('content')
<div>
    <h2 class="sm:text-2xl lg:text-4xl font-bold uppercase bg-green-600 text-white px-4 py-2">enregistrer un nouvel administrateur</h2>
</div>
 <div class="absolute bottom-[50%] right-[50%] transform translate-x-[50%] translate-y-[50%]">
    <form method="POST" action="{{ route('admin.register') }}" >
        @csrf
        <div class="p-6">
            <div class="p-2">
                {{-- <label class="capitalize me-1 text-xs sm:text-base" for="password">password :</label> --}}
                <input placeholder="name" value="{{ old('name') }}"  type="text" name="name" id="name" class="px-2 py-1 text-xs sm:text-sm bg-[#F1F1F1] outline-none border-b-2 focus:bg-[#e9e6e6] rounded-md" />
                @error('name')
                    <p class="text-xs text-red-500 text-center">{{ $message }}</p>
                @enderror

            </div>
            <div class="p-2">
                {{-- <label class="capitalize me-1 text-xs sm:text-base " for="email">email :</label> --}}
                <input placeholder="email" value="{{ old('email') }}" class=" px-2 py-1 text-xs sm:text-sm bg-[#F1F1F1] outline-none border-b-2 focus:bg-[#e9e6e6] rounded-md" type="text" id="email" name="email" />
                @error('email')
                    <p class="text-xs text-red-500 text-center">{{ $message }}</p>
                @enderror
            </div>
            <div class="p-2">
                {{-- <label class="capitalize me-1 text-xs sm:text-base" for="password">password :</label> --}}
                <input placeholder="password"  type="password" name="password" id="password" class="px-2 py-1 text-xs sm:text-sm bg-[#F1F1F1] outline-none border-b-2 focus:bg-[#e9e6e6] rounded-md" />
                @error('password')
                    <p class="text-xs text-red-500 text-center">{{ $message }}</p>
                @enderror

            </div>
        </div>

        <div class="flex justify-end p-2">
            <button class="capitalize bg-[#575DE3] text-slate-50 px-3 text-sm sm:text-md md:text-lg rounded-sm hover:bg-[#3f45d7]" type="submit">submit</button>
        </div>
    </form>
 </div>
@endsection
