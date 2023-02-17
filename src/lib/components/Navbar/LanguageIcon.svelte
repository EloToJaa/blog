<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { Pl, Us } from 'svelte-flag-icons';
	let lang = 'en';
	export let size = '20';
</script>

<Button
	class="mr-2"
	color="light"
	pill={true}
	size="sm"
	on:click={() => (lang = lang === 'en' ? 'pl' : 'en')}
>
	{#if lang === 'en'}
		<Us {size} class="m-auto" />
	{:else}
		<Pl {size} class="m-auto" />
	{/if}
</Button>
