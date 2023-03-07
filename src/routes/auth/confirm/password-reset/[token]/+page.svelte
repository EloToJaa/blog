<script lang="ts">
	import FormInput from '$lib/components/Utils/FormInput.svelte';
	import { Button } from 'flowbite-svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Reset password</title>
</svelte:head>

<form class="flex flex-col space-y-6" method="POST">
	<h3>Reset password</h3>
	<FormInput name="password" type="password" messages={form?.messages?.password} />
	<FormInput name="passwordConfirm" type="password" messages={form?.messages?.passwordConfirm} />
	<Button type="submit" class="w-full1">Reset password</Button>
</form>
