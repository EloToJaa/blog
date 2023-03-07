<script lang="ts">
	import FormInput from '$lib/components/Utils/FormInput.svelte';
	import { notify } from '$lib/utils/notification';

	import { Button } from 'flowbite-svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;

	$: notify(form?.notification, form?.error);
</script>

<svelte:head>
	<title>New article</title>
</svelte:head>

<form class="flex flex-col space-y-6" method="POST">
	<h3>Create an article</h3>
	<FormInput name="title" value={form?.title} messages={form?.messages?.title} />
	<FormInput
		textarea
		name="description"
		value={form?.description}
		messages={form?.messages?.description}
	/>

	<FormInput
		textarea
		name="content"
		value={form?.content}
		messages={form?.messages?.content}
		rows={10}
	/>

	<FormInput
		type="datetime-local"
		name="postedAt"
		label="Posted at"
		value={form?.postedAt}
		messages={form?.messages?.postedAt}
	/>

	<Button type="submit" class="w-full">Create the article</Button>
</form>
