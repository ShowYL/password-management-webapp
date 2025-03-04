<script lang="ts">
	import { distance } from 'fastest-levenshtein';
	import Input from '$lib/composants/Input.svelte';
	import CardAcc from '$lib/composants/CardAcc.svelte';
	import type { Champ } from '$lib/composants/ValidInput';
	import valid from '$lib/composants/ValidInput';
	import type { PageProps } from './$types';
	import type { Compte } from '$lib/db/compte';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();
	let acc: true | Compte[] = $state(data.data);
	let user: string = $state(data.slug);
	let research: string = $state('');
	let popup: boolean = $state(false);
	let menuUtilisateur: boolean = $state(false);

	let usernameAcc: { value: string; type: Champ } = $state({ value: '', type: 'username' });
	let titleAcc: { value: string; type: Champ } = $state({ value: '', type: 'text' });
	let emailAcc: { value: string; type: Champ } = $state({ value: '', type: 'email' });
	let passwordAcc: { value: string; type: Champ } = $state({ value: '', type: 'password' });
	let addAcc: { value: string; type: Champ }[] = $derived([
		usernameAcc,
		titleAcc,
		emailAcc,
		passwordAcc
	]);

	function disconnect() {
		goto('../');
	}

	async function handleCreateAcc() {
		for (const champ of addAcc) {
			if (!valid(champ.value, champ.type)) return;
		}

		fetch('/api/compte/createAcc', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: titleAcc.value,
				username: usernameAcc.value,
				password: passwordAcc.value,
				email: emailAcc.value,
				user_name: data.slug
			})
		}).then(() => {
			popup = false;
			usernameAcc.value = '';
			titleAcc.value = '';
			emailAcc.value = '';
			passwordAcc.value = '';
		});
	}
</script>

<div class="h-full w-full">
	<div class="flex h-1/6 p-10 text-3xl">
		<div class="w-3/5">Password Management</div>
		<div class="relative flex w-2/5 justify-end text-2xl">
			<button
				class="group flex items-center justify-end gap-2 rounded p-2 hover:bg-gray-400 {!menuUtilisateur
					? 'bg-neutral-300'
					: 'bg-gray-400'}"
				onclick={() => (menuUtilisateur = !menuUtilisateur)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-chevron-down {menuUtilisateur
						? ''
						: 'invisible'} group-hover:visible"><path d="m6 9 6 6 6-6" /></svg
				>{user}<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-user"
					><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle
						cx="12"
						cy="7"
						r="4"
					/></svg
				>
			</button>
			<div
				class="{menuUtilisateur
					? ''
					: 'hidden'} absolute top-full rounded-b-lg border border-slate-400 bg-gray-200 shadow text-lg"
			>
				<div class=""><button class="hover:bg-gray-400 p-2" onclick={() => disconnect()}>Log out</button></div>
			</div>
		</div>
	</div>
	<div class="h-5/6">
		<div class="-mt-10 ml-6 flex h-1/6 w-full items-center gap-4">
			<div class="w-2/6"><Input text="Search" type="text" bind:value={research} /></div>
			<button
				class="rounded border-2 border-neutral-900 p-2 hover:bg-neutral-900 hover:text-white {popup
					? 'bg-neutral-900 text-white'
					: ''}"
				onclick={() => (popup = true)}
				>Add
			</button>
		</div>
		<div class="grid auto-rows-min grid-cols-4 gap-4 px-6">
			{#if acc !== true}
				{#each acc as i}
					<CardAcc
						title={i.title ?? ''}
						email={i.email ?? ''}
						password={i.password ?? ''}
						username={i.username ?? ''}
					/>
				{/each}
			{:else}
				pas de compte
			{/if}
		</div>
	</div>
</div>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="h-full w-full {popup
		? 'visible'
		: 'hidden'} fixed top-0 z-10 flex cursor-default items-center justify-center bg-neutral-800/40"
	onclick={() => (popup = false)}
>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="h-1/2 w-1/2 cursor-auto rounded-md bg-neutral-300 p-2"
		onclick={(event) => event.stopPropagation()}
		role="alert"
	>
		<div class="relative flex items-center">
			<h2 class="mx-auto mt-2 text-xl">Add an Account</h2>
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
				class="lucide lucide-circle-x absolute right-2 top-2 cursor-pointer"
				onclick={() => (popup = false)}
			>
				<circle cx="12" cy="12" r="10" />
				<path d="m15 9-6 6" />
				<path d="m9 9 6 6" />
			</svg>
		</div>
		<div class="mt-6 flex w-full flex-col items-center gap-4">
			<div class="w-2/3">
				<Input text="title" bind:value={titleAcc.value} fn={handleCreateAcc} />
			</div>
			<div class="w-2/3">
				<Input
					text="username"
					type="username"
					bind:value={usernameAcc.value}
					fn={handleCreateAcc}
				/>
			</div>
			<div class="w-2/3">
				<Input text="email" type="email" bind:value={emailAcc.value} fn={handleCreateAcc} />
			</div>
			<div class="w-2/3">
				<Input
					text="password"
					type="password"
					bind:value={passwordAcc.value}
					fn={handleCreateAcc}
				/>
			</div>
			<button
				class="w-2/3 rounded-lg border border-neutral-900 p-2 hover:bg-neutral-900 hover:text-white"
				onclick={() => handleCreateAcc()}
				>Add
			</button>
		</div>
	</div>
</div>
