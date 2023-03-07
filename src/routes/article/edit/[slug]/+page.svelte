<script lang="ts">
	import FormInput from '$lib/components/Utils/FormInput.svelte';

	import { Button } from 'flowbite-svelte';

	import toast from 'svelte-french-toast';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	$: form?.notification && !form.error && toast.success(form.notification);
	$: form?.notification && form.error && toast.error(form.notification);
</script>

<svelte:head>
	<title>New article</title>
</svelte:head>

<form class="flex flex-col space-y-6" method="POST">
	<h3>Create an article</h3>
	<FormInput name="title" value={form?.title ?? data.title} messages={form?.messages?.title} />
	<FormInput
		textarea
		name="description"
		value={form?.description ?? data?.description}
		messages={form?.messages?.description}
	/>

	<FormInput
		textarea
		name="content"
		value={form?.content ?? data?.content}
		messages={form?.messages?.content}
		rows={10}
	/>

	<FormInput
		type="datetime-local"
		name="postedAt"
		label="Posted at"
		value={form?.date ?? data?.postedAt}
		messages={form?.messages?.date}
	/>

	<Button type="submit" class="w-full">Create the article</Button>
</form>
