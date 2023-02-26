<script lang="ts">
	import { page } from '$app/stores';
	import { Navbar, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import Logo from './Logo.svelte';
	import OptionsPanel from './OptionsPanel.svelte';
</script>

<Navbar
	let:hidden
	let:toggle
	navClass="px-2 sm:px-4 py-2.5 absolute w-full z-20 top-0 left-0 border-b"
>
	<Logo />
	<div class="flex md:order-2">
		<OptionsPanel />
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden}>
		<NavLi href="/" active={$page.route.id === '/'}>Home</NavLi>
		<NavLi href="/about" active={$page.route.id === '/about'}>About</NavLi>
		<NavLi href="/services" active={$page.route.id === '/services'}>Services</NavLi>
	</NavUl>
</Navbar>
