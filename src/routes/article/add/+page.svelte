<script lang="ts">
	import FormInput from '$lib/components/Utils/FormInput.svelte';
	import { Button } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: form?.notification && form.status === 201 && toast.success(form.notification);
	$: form?.notification && form.status === 400 && toast.error(form.notification);
</script>

<form class="flex flex-col space-y-6" method="POST">
	<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Create a new account</h3>
	<FormInput name="title" value={form?.title} messages={form?.messages?.title} />
	<FormInput
		textarea={true}
		name="description"
		value={form?.description}
		messages={form?.messages?.description}
	/>

	<Button type="submit" class="w-full1">Register</Button>
</form>
