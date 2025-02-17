<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/composants/Input.svelte';
	import Popup from '$lib/composants/Popup.svelte';
	import valid from '$lib/composants/ValidInput';

	let login: boolean = $state(true);
	let username: string = $state('');
	let password: string = $state('');
	let popup: boolean = $state(false);
	let popupText: string = $state('');

	function valide(): boolean {
		return valid(username, 'username') && valid(password, 'password');
	}

	function popupPrint(text: string) {
		popupText = text;
		popup = true;
	}

	async function buttonClicked() {
		if (login) {
			if (valide()) {
				const res = await fetch('/api/user/getUser', {
					method: 'POST',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify({ username, password })
				});

				const data = await res.json();

				if (data.code === 500) {
					popupPrint('Internal Error, try again later');
					return;
				}

				if (data.code === 404) {
					popupPrint('The password or the username is incorrect');
					return;
				}
				goto(`/u/${data.data[0].username}`);
				return;
			}
		} else {
			if (valide()) {
				const res = await fetch('/api/user/createUser', {
					method: 'POST',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify({ username, password })
				});

				const data = await res.json();

				if (data.code === 500) {
					popupPrint('Internal Error, try again later');
					return;
				}

				login = true;
				username = '';
				password = '';
				return;
			}
		}
	}
</script>

<div
	class="bg-style flex h-full w-full flex-col bg-cover"
	style="background-image: url(/background-log.jpg)"
>
	<div class="card z-10">
		<h1 class="mt-8 text-2xl">{login ? 'Login' : 'Register'}</h1>
		<div class="mt-8 flex h-4/5 w-1/2 flex-col">
			<div class="mt-12">
				<Input text="Username" bind:value={username} type="username" fn={buttonClicked} />
			</div>
			<div class="mt-8">
				<Input text="Password" bind:value={password} type="password" fn={buttonClicked} />
			</div>
			<div class="flex">
				<button
					type="submit"
					class="mt-8 w-full rounded border border-black bg-blue-500 p-2 font-medium hover:bg-blue-600"
					onclick={() => buttonClicked()}>{login ? 'Login' : 'Register'}</button
				>
			</div>
			<p class="mt-4 cursor-default text-xs">
				{login ? 'You doesnt have an account ? ' : 'You already have an account ? '}<button
					class="cursor-pointer text-blue-500 hover:text-blue-600 hover:underline hover:underline-offset-2"
					onclick={() => (login = !login)}>{!login ? 'Login' : 'Register'}</button
				>
			</p>
		</div>
	</div>
</div>
<Popup bind:visible={popup} text={popupText} width={'w-[30%]'} height={'h-[15%]'} />
