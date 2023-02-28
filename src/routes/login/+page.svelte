<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Label } from 'flowbite-svelte';

	// export let data: PageData;
</script>

<form class="flex flex-col space-y-6" method="POST" use:enhance>
	<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign in to our platform</h3>
	<Label class="space-y-2">
		<span>Username or Email</span>
		<Input type="text" name="usernameOrEmail" placeholder="name@company.com" required />
	</Label>
	<Label class="space-y-2">
		<span>Password</span>
		<Input type="password" name="password" placeholder="•••••" required />
	</Label>
	<!-- <div class="flex items-start">
		<Checkbox>Remember me</Checkbox>
		<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
			>Lost password?</a
		>
	</div> -->
	<Button type="submit" class="w-full1">Login to your account</Button>
	<!-- <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
		Not registered? <a href="/" class="text-blue-700 hover:underline dark:text-blue-500"
			>Create account</a
		>
	</div> -->
</form>
