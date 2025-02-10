<script lang="ts">
	import type { Champ } from '$lib/composants/ValidInput';

	let { text = '', type = 'text' as Champ, value = $bindable('') } = $props();

</script>

<div class="input-group">
	<input
		required
		type={type === 'username' ? 'text' : type}
		name="text"
		autocomplete="off"
		class="input"
		bind:value
	/>
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label class="user-label">{text}</label>
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
