<script>
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import { Button, Kbd, Modal, Search } from 'flowbite-svelte';
	import Fa from 'svelte-fa';
	import { openSearchModal } from '../../stores';
	import SearchModal from './SearchModal.svelte';

	let open = false;

	openSearchModal.subscribe((value) => (open = value));
</script>

<Button
	color="light"
	data-collapse-toggle="mobile-menu-3"
	aria-controls="mobile-menu-3"
	aria-expanded="false"
	class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
	pill
	on:click={() => (open = !open)}
>
	<Fa icon={faSearch} class="m-auto" />
</Button>
<div class="hidden relative md:block">
	<Search size="md" on:click={() => (open = !open)}>
		<Kbd>Shift+K</Kbd>
	</Search>
</div>
<Modal title="Search" bind:open autoclose>
	<SearchModal />
</Modal>
