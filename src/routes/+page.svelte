<script lang="ts">
	import Input from '$lib/composants/Input.svelte';

	let homepage: boolean = $state(true);
	let login: boolean = $state(true);
	let username: string = $state('');
	let password: string = $state('');
</script>

{#if homepage}
	<main class="h-screen w-screen">
		<div
			class="flex h-full w-full flex-col items-center bg-cover bg-center bg-no-repeat"
			style="background-image:url(/background-lock.jpg)"
		>
			<h1 class="mt-28 text-center text-2xl text-amber-100 backdrop-blur-sm">
				Password Management
			</h1>
			<button
				class="mb-24 mt-auto rounded border-2 border-double border-transparent bg-slate-900 bg-opacity-60 p-1.5 text-lg text-amber-100 hover:border-amber-100 hover:bg-opacity-80"
				onclick={() => (homepage = false)}>Dive in</button
			>
		</div>
	</main>
{:else if login}
	<div
		class="bg-style flex h-full w-full flex-col bg-cover"
		style="background-image: url(/background-log.jpg)"
	>
		<div class="card z-10">
			<h1 class="mt-8 text-xl">Login</h1>
			<div class="mt-8 flex h-4/5 w-1/2 flex-col">
				<div class="mt-16">
					<Input text="Username" bind:value={username} type="text" />
				</div>
				<div class="mt-8">
					<Input text="Password" bind:value={password} type="password" />
				</div>
				<div class="flex">
					<button
						class="mt-8 w-full rounded border border-black bg-blue-500 p-2 font-medium hover:bg-blue-600"
						>Login</button
					>
				</div>
				<p class="mt-4 cursor-default text-xs">
					You doesnt have an account ? <button
						class="cursor-pointer text-blue-500 hover:text-blue-600 hover:underline hover:underline-offset-2"
						onclick={() => (login = false)}>Register</button
					>
				</p>
			</div>
		</div>
	</div>
{:else}
	<div
		class="bg-style flex h-full w-full flex-col bg-cover"
		style="background-image: url(/background-log.jpg)"
	>
		<div class="card z-10">
			<h1 class="mt-8 text-xl">Register</h1>
			<div class="mt-8 flex h-4/5 w-1/2 flex-col">
				<div class="mt-16">
					<Input text="Username" bind:value={username} type="text" />
				</div>
				<div class="mt-8">
					<Input text="Password" bind:value={password} type="password" />
				</div>
				<div class="flex">
					<button
						class="mt-8 w-full rounded border border-black bg-blue-500 p-2 font-medium hover:bg-blue-600"
						>Register</button
					>
				</div>
				<p class="mt-4 cursor-default text-xs">
					You already have an account ? <button
						class="cursor-pointer text-blue-500 hover:text-blue-600 hover:underline hover:underline-offset-2"
						onclick={() => (login = true)}>Login</button
					>
				</p>
			</div>
		</div>
	</div>
{/if}
