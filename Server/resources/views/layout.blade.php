<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title class="uppercase">@yield('title')</title>
    @vite(['resources/css/app.css','resources/js/app.js'])

</head>
<body>
    <div
    @auth
    class="flex lg:flex-row w-full h-screen flex-col"
    @endauth
    @guest
    class="relative h-screen"
    @endguest
    >

        <x-header />
        <div class="block  w-full lg:h-full lg:overflow-auto">
            @yield('content')
        </div>

    </div>
</body>
</html>
