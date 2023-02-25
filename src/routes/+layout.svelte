<script lang="ts">
	import '../app.css';
	import Navbar from '../lib/components/Navbar/Navbar.svelte';
</script>

<div class="relative px-1 dark:text-gray-100 dark:bg-gray-800">
	<Navbar />
	<div class="overflow-scroll pb-8 pt-16 md:pt-24 h-screen">
		<div class="container mx-auto text-justify">
			<slot />
		</div>
	</div>
</div>
