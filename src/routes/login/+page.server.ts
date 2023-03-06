import LoginValidation from '$lib/validation/login';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';

export const load = (({ locals }) => {
	if (locals.pocketBase.authStore.isValid) {
		throw redirect(303, '/');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		// login validation
		const result = LoginValidation.safeParse(data);
		if (!result.success) {
			return {
				error: true,
				notification: 'An error occurred while logging in. Please try again.',
				message: result.error.flatten().fieldErrors,
				username: data.usernameOrEmail as string
			};
		}

		try {
			const users = locals.pocketBase.collection('users');
			await users.authWithPassword(data.usernameOrEmail as string, data.password as string);
		} catch (err) {
			console.log(err);
			return {
				error: true,
				notification: 'An error occurred while logging in. Please try again.',
				username: data.usernameOrEmail as string
			};
		}
		throw redirect(303, '/');
	}
} satisfies Actions;
