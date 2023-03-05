<script lang="ts">
	import FormInput from '$lib/components/Utils/FormInput.svelte';
	import { Button } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let selected;

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
	<input
		type="datetime-local"
		name="date"
		class="disabled:opacity-50 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
	/>
	<FormInput
		textarea={true}
		name="content"
		value={form?.content}
		messages={form?.messages?.content}
		rows={8}
	/>
	<Button type="submit" class="w-full">Create a post</Button>
</form>
