<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
	import Navbar from '../lib/components/Navbar/Navbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Toaster />
<div class="relative px-1 dark:text-gray-100 dark:bg-gray-800">
	<Navbar user={data.user} />
	<div class="overflow-scroll pb-8 pt-16 md:pt-24 h-screen">
		<div class="container mx-auto text-justify">
			<slot />
		</div>
	</div>
</div>
