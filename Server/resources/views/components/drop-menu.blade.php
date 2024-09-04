

<div id="" class="relative">
  <button id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" class=" outline-none uppercase text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
    menu
    <svg class="w-2.5 h-2.5 ms-3 transform duration-[.5s] " aria-hidden="true" id="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg>
  </button>
  <!-- Dropdown menu -->
  <div id="dropdownDelay" class=" absolute end-0 z-10 hidden transform duration-[.5s] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
        <li>
          <a href="{{ route('admin.dashboard') }}" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white capitalize">general</a>
        </li>
        <li>
          <a href="{{ route('complaints.index') }}"  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white capitalize">plaintes</a>
        </li>
        <li>
          <a href="{{ route('user.index') }}" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white capitalize ">users</a>
        </li>
        <li>
          <a href="{{ route('ip.index') }}"  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white capitalize ">les ips</a>
        </li>
        <li>
          <form method="POST" action="{{ route('logout') }}" >@csrf <button class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left">Sign out</button></form>
        </li>
      </ul>
  </div>

</div>

    <script>
      document.addEventListener('DOMContentLoaded', function () {
          var dropdownButton = document.getElementById('dropdownDelayButton');
          var dropdownMenu = document.getElementById('dropdownDelay');
          var svg = document.getElementById('svg');
          var timeout;

          // Function to toggle the dropdown menu
          function toggleDropdown(show) {
              if (show) {
                  dropdownMenu.classList.remove('hidden');
                  svg.classList.add('rotate-180');

              } else {
                  dropdownMenu.classList.add('hidden');
                  svg.classList.remove('rotate-180');
              }
          }

          // Show dropdown on click
          dropdownButton.addEventListener('click', function () {
              var isHidden = dropdownMenu.classList.contains('hidden');
              toggleDropdown(isHidden);
          });


      });
  </script>
