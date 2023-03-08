<script lang="ts">
	import { Input } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import Flatpickr from 'svelte-flatpickr';

	export let value = '';
	export let name: string;
	export let placeholder = '';

	onMount(() => {
		if (document.body.classList.contains('dark')) {
			import('flatpickr/dist/themes/dark.css');
		} else {
			import('flatpickr/dist/themes/light.css');
		}
	});

	const options = {
		enableTime: true,
		element: '#date-picker',
		altInput: true,
		altFormat: 'F j, Y H:i',
		dateFormat: 'Y-m-d H:i',
		minDate: 'today',
		time_24hr: true
	};
</script>

<Flatpickr
	{options}
	element="#date-picker"
	class="disabled:opacity-50 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 bg-gray-50"
	value={new Date()}
>
	<div class="flatpickr" id="date-picker">
		<Input type="text" {name} {placeholder} {value} data-input />
	</div>
</Flatpickr>
