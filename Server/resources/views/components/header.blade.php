
    @guest

            <div class="bg-[#f1f1f1 p-1 rounded-md flex justify-center">
                <img src="{{ asset('images/logo1.png') }}" alt="Logo" class="w-[130px] md:w-[160px]">
            </div>
    @endguest
    @auth
       <header class="bg-[#f1f1f1] px-2 lg:p-4 text-black rounded-b-md lg:rounded-r-md flex flex-row lg:flex-col items-center justify-between" >
            <div class="flex  lg:flex-col items-center">
                <a href="{{ route('admin.dashboard') }}"><img src="{{ asset('images/logo1.png') }}" class="w-[130px] md:w-[160px] m-2" alt="img"></a>
                <h2 class="font-bold hidden lg:block capitalize">panneau d'administration</h2>
            </div>
            <div class="hidden lg:block"><x-navLinks /></div>
            <div class="hidden lg:block lg:mt-[10rem]">
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="lg:py-4 hover:bg-[#C9C9C9] transition-all duration-[.3s] lg:w-[15rem] rounded-lg lg:my-2 text-l uppercase text-center ">déconnexion</button>
                </form>
            </div>
            <div id="dropDown" class="block lg:hidden  ">
                <x-drop-menu />
            </div>

       </header>


    @endauth
