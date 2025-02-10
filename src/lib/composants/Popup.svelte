<script lang="ts">
	let { visible = $bindable(false), width="w-[40%]", height="h-[50%]", text="Pop up" } = $props();

</script>

<button
	class="fixed flex justify-center items-center left-0 top-0 z-20 h-screen w-screen bg-black/35 cursor-default {visible
		? 'visible'
		: 'hidden'}"
    onclick={() => {visible = false}}
>
	<div class="{width} {height} rounded-xl bg-neutral-200 text-black flex flex-col justify-center items-center p-4" onclick={e => e.stopPropagation()}>
    <div class="relative">
        <img src="/circle-x.svg" class="absolute right-[-2px] top-[-23px] cursor-pointer" onclick={() => visible = false} alt="">
        {text}
    </div></div>
</button>
