<script lang="ts">
	import { page } from '$app/stores';
</script>

<div
	class="bg-style flex h-full w-full flex-col bg-cover"
	style="background-image: url(/background-log.jpg)"
>
	<div class="card z-10">
		<div class="font-extrabold text-black">
			<h1 class="text-5xl">Error <span class="text-6xl">{$page.status}</span></h1>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<p class="mt-20 text-center text-2xl">
				{$page.error?.message || ''}<br />{$page.error && 'link' in $page.error
					? $page.error.link
					: ''}<br /><span onclick={() => history.back()} class="hover:underline">Go back</span>
			</p>
		</div>
	</div>
</div>
