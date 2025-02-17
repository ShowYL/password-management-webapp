<script lang="ts">
	import type { Champ } from '$lib/composants/ValidInput';

	let { text = '', type = 'text' as Champ, value = $bindable(''), fn = null } = $props();

	let passwordVisible = $state(false);

	function typeChamp(type: string) {
		switch (type) {
			case 'username':
				return 'text';

			case 'password': {
				return passwordVisible ? 'text' : 'password';
			}

			default:
				return type;
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
	{#if type === 'password' && value.length > 0}
		{#key passwordVisible}
			{#if passwordVisible}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
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
					class="lucide lucide-eye-closed absolute right-[15px] top-[13px] cursor-pointer"
					onclick={() => (passwordVisible = !passwordVisible)}
					><path d="m15 18-.722-3.25" /><path d="M2 8a10.645 10.645 0 0 0 20 0" /><path
						d="m20 15-1.726-2.05"
					/><path d="m4 15 1.726-2.05" /><path d="m9 18 .722-3.25" /></svg
				>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
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
					class="lucide lucide-eye absolute right-[15px] top-[13px] cursor-pointer"
					onclick={() => (passwordVisible = !passwordVisible)}
					><path
						d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
					/><circle cx="12" cy="12" r="3" /></svg
				>
			{/if}
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
		@apply -translate-y-1/2 scale-[0.8] bg-neutral-300 px-[0.2em] text-blue-500;
	}
</style>
