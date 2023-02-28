<script lang="ts">
	import Login from '$lib/components/Login/Login.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{data.message}
<Login />
