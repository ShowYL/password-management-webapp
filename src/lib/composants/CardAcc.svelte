<script lang="ts">
	let { title = '', email = '', username = '', password = '' } = $props();

	let passwordVisible: boolean = $state(false);
	let copied: string = $state("");

	function copyToClipboard(value: string) {
		 if (value !== copied){
			 navigator.clipboard.writeText(value);
			 copied = value
			 alert('Copied !');
		 }
	}
</script>

<div class="card-acc">
	<div class="text-xl">
		{title}
	</div>
	<div class="mt-1">
		{@render champ('email', email)}
		{@render champ('username', username)}
		{@render champ('password', password)}
	</div>
</div>

{#snippet champ(display: string, value: string)}
	{#if value !== '' && display === 'password'}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative rounded p-1 hover:cursor-pointer hover:bg-gray-400"
			onclick={() => copyToClipboard(value)}
		>
			<div class="text-xs text-gray-600">{display}</div>
			<div class="text-sm">{passwordVisible ? value : '******'}</div>
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
					class="lucide lucide-eye-closed absolute bottom-[16%] right-[6%] cursor-pointer"
					onclick={(e) => {
						e.stopPropagation();
						passwordVisible = !passwordVisible;
					}}
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
					class="lucide lucide-eye absolute bottom-[16%] right-[6%] cursor-pointer"
					onclick={(e) => {
						e.stopPropagation();
						passwordVisible = !passwordVisible;
					}}
					><path
						d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
					/><circle cx="12" cy="12" r="3" /></svg
				>
			{/if}
		</div>
	{:else if value !== ''}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="rounded p-1 hover:cursor-pointer hover:bg-gray-400"
			onclick={() => copyToClipboard(value)}
		>
			<div class="text-xs text-gray-600">{display}</div>
			<div class="text-sm">{value}</div>
		</div>
	{/if}
{/snippet}
