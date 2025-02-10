<script lang="ts">
	import type { Champ } from '$lib/composants/ValidInput';

	let { text = '', type = 'text' as Champ, value = $bindable(''), fn=null} = $props();

	let passwordVisible =  $state(false)

	function typeChamp(type: string){
		switch(type){

			case "username":
				return "text"
				
			case "password":{
				return passwordVisible ? "text" : "password"
			}

			default:
				return type
		}
	}

</script>

<div class="input-group">
	<input
		required
		type={typeChamp(type)}
		name="text"
		autocomplete="off"
		class="input"
		bind:value
		onkeydown={(event) => {
			if (event.key === 'Enter' && fn) {
				fn();
				(event.target as HTMLInputElement).blur();
			}
		}}
	/>
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label class="user-label">{text}</label>
	{#if type === "password" && value.length > 0}
		{#key passwordVisible}
		<img class="absolute right-[15px] top-[13px] cursor-pointer" onclick={() => passwordVisible = !passwordVisible} src="{passwordVisible ? "/eye-closed.svg" : "/eye.svg"}" alt="">
		{/key}
	{/if}

</div>

<style>
	/* From Uiverse.io by alexruix */
	.input-group {
		@apply relative w-full;
	}

	.input {
		@apply w-full rounded-xl border-[1.5px] border-neutral-400 bg-transparent p-3 text-base text-black transition-[border] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)];
	}

	.user-label {
		@apply pointer-events-none absolute left-[15px] translate-y-3 text-black transition-transform duration-150 ease-[cubic-bezier(0.4,0,0.2,1)];
	}

	.input:focus,
	input:valid {
		@apply border-[1.5px] border-blue-600 outline-none;
	}

	.input:focus ~ label,
	input:valid ~ label {
		@apply -translate-y-1/2 scale-[0.8] bg-neutral-200 px-[0.2em] text-blue-500;
	}
</style>
