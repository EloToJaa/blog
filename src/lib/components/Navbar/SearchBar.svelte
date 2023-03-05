<script>
	import { page } from '$app/stores';
	import { faHouse, faSearch } from '@fortawesome/free-solid-svg-icons';
	import { Button } from 'flowbite-svelte';
	import Fa from 'svelte-fa';
</script>

<Button
	href={$page.route.id === '/search' ? '/' : '/search'}
	data-collapse-toggle="mobile-menu-3"
	aria-controls="mobile-menu-3"
	aria-expanded="false"
	class="mr-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
	pill
>
	{#if $page.route.id === '/search'}
		<Fa icon={faHouse} class="m-auto" />
	{:else}
		<Fa icon={faSearch} class="m-auto" />
	{/if}
</Button>
