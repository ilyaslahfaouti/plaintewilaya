@extends('layout')

@section('title','login')
@section('content')
 <div class="absolute bottom-[50%] right-[50%] transform translate-x-[50%] translate-y-[50%]">
    <form method="POST" action="{{ route('login') }}" >
        @csrf
        <div class="p-6">
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
