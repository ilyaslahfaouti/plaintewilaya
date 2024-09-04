@props(['title'=>null,'willExpand'=>false,'box_class'=>null,'content_class'=>null])
<div class="{{ $box_class ? $box_class : '' }} border-[1px] border-gray-300 rounded-t-md rounded-b-sm {{ $willExpand ? 'md:col-span-2 xl:col-span-1' : '' }}">
    <div class="px-3 py-2 bg-gray-700 border-b rounded-t-md ">
        <h3 class="font-semibold text-lime-50  capitalize">{{ $title }}</h3>
    </div>
    <div class=" {{ $content_class ? $content_class : '' }} px-3 py-2 text-sm">

        {{$slot}}

    </div>
</div>
