<script lang="ts">
	import FormInput from '$lib/components/Utils/FormInput.svelte';
	import { notify } from '$lib/utils/notification';

	import { Button, Modal } from 'flowbite-svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;
	let preview = form?.preview ?? false;

	$: notify(form?.notification, form?.error);
</script>

<svelte:head>
	<title>New article</title>
</svelte:head>

<form class="flex flex-col space-y-6" method="POST" action="?/create">
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

	<button formaction="?/preview" class="bg-green-600 py-2 rounded-lg">Preview the article</button>
	<Button type="submit">Create the article</Button>
</form>

<Modal title={`Title: ${form?.title}`} bind:open={preview} size="lg" autoclose>
	<p>{@html form?.formattedContent}</p>
	<svelte:fragment slot="footer">
		<Button color="red">Close</Button>
	</svelte:fragment>
</Modal>
