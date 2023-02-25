<script>
	import { searchStore } from '$lib/stores/search';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import { Button, Search } from 'flowbite-svelte';
	import Fa from 'svelte-fa';

	// let open = false;
</script>

<Button
	color="light"
	data-collapse-toggle="mobile-menu-3"
	aria-controls="mobile-menu-3"
	aria-expanded="false"
	class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
	pill
>
	<!-- on:click={() => (open = !open)} -->
	<Fa icon={faSearch} class="m-auto" />
</Button>
<div class="hidden relative md:block">
	<Search size="md" bind:value={$searchStore.search} />
</div>
