<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';

	export let value: string | undefined = '';
	export let type:
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'reset'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week'
		| 'search' = 'text';
	export let name: string;
	export let placeholder: string | undefined = '';
	export let messages: string[] | undefined;
	const message = messages?.[0];
	let title: string = name.replace(/([A-Z])/g, ' $1').trim();
	title = title.charAt(0).toUpperCase() + title.slice(1);
</script>

<Label class="space-y-2">
	<span>{title}</span>
	<Input {type} {name} {placeholder} color={messages ? 'red' : 'base'} {value} />

	{#if messages}
		<div class="text-red-500 text-sm">{message}</div>
	{/if}
</Label>
