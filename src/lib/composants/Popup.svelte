<script lang="ts">
	let {
		visible = $bindable(false),
		width = 'w-[40%]',
		height = 'h-[50%]',
		text = 'Pop up'
	} = $props();
</script>

<button
	class="fixed left-0 top-0 z-20 flex h-screen w-screen cursor-default items-center justify-center bg-black/35 {visible
		? 'visible'
		: 'hidden'}"
	onclick={() => {
		visible = false;
	}}
>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="{width} {height} flex flex-col items-center justify-center rounded-xl bg-neutral-200 p-4 text-black"
		onclick={(e) => e.stopPropagation()}
	>
		<div class="relative">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#000000"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-circle-x absolute right-[-2px] top-[-23px] cursor-pointer"
				onclick={() => (visible = false)}
				><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg
			>
			{text}
		</div>
	</div>
</button>
