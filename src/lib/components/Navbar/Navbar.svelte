<script lang="ts">
	import { page } from '$app/stores';
	import type UserType from '$lib/types/User';
	import { Navbar, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import AccountButton from './AccountButton.svelte';
	import DarkMode from './DarkMode.svelte';
	import Logo from './Logo.svelte';
	import SearchBar from './SearchBar.svelte';

	export let user: UserType | null;
	const links = [
		{ id: '/', name: 'Home' },
		{ id: '/contact', name: 'Contact' }
	];
</script>

<Navbar
	let:hidden
	let:toggle
	navClass="px-2 sm:px-4 py-2.5 absolute w-full z-20 top-0 left-0 border-b bg-blue-50"
>
	<Logo />
	<div class="flex md:order-2 ">
		<SearchBar />
		<DarkMode />
		<AccountButton {user} />
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden}>
		{#each links as link}
			<NavLi href={link.id} active={$page.route.id === link.id}>{link.name}</NavLi>
		{/each}
	</NavUl>
</Navbar>
