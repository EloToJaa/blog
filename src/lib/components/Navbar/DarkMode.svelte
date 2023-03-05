<script lang="ts">
	import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
	import { Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';

	const STORAGE_KEY = 'theme';
	const DARK_PREFERENCE = '(prefers-color-scheme: dark)';

	const THEMES = {
		DARK: 'dark',
		LIGHT: 'light'
	};

	let currentTheme = THEMES.DARK;

	const prefersDarkTheme = () => window.matchMedia(DARK_PREFERENCE).matches;

	const toggleTheme = () => {
		const stored = localStorage.getItem(STORAGE_KEY);

		if (stored) {
			localStorage.removeItem(STORAGE_KEY);
		} else {
			localStorage.setItem(STORAGE_KEY, prefersDarkTheme() ? THEMES.LIGHT : THEMES.DARK);
		}

		applyTheme();
	};

	const applyTheme = () => {
		const preferredTheme = prefersDarkTheme() ? THEMES.DARK : THEMES.LIGHT;
		currentTheme = localStorage.getItem(STORAGE_KEY) ?? preferredTheme;

		if (currentTheme === THEMES.DARK) {
			document.body.classList.remove(THEMES.LIGHT);
			document.body.classList.add(THEMES.DARK);
		} else {
			document.body.classList.remove(THEMES.DARK);
			document.body.classList.add(THEMES.LIGHT);
		}
	};

	onMount(() => {
		applyTheme();
		window.matchMedia(DARK_PREFERENCE).addEventListener('change', applyTheme);
	});
</script>

<Button
	class="mr-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
	pill={true}
	on:click={toggleTheme}
>
	<Fa icon={currentTheme === THEMES.DARK ? faMoon : faSun} class="m-auto" />
</Button>
