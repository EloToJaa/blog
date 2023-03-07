import type Messages from '$lib/types/Messages';
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
		const errorObject = {
			error: true,
			notification: 'An error occurred while logging in. Please try again.',
			usernameOrEmail: data.usernameOrEmail as string
		};

		// login validation
		const result = LoginValidation.safeParse(data);
		if (!result.success) {
			return {
				...errorObject,
				messages: result.error.flatten().fieldErrors as Messages
			};
		}

		try {
			const users = locals.pocketBase.collection('users');
			await users.authWithPassword(data.usernameOrEmail as string, data.password as string);
		} catch (err: object | any) {
			return {
				...errorObject,
				messages: {
					usernameOrEmail: ['Invalid username or password'],
					password: ['Invalid username or password']
				} as Messages
			};
		}

		const user = locals.pocketBase.authStore;
		if (user.model && !user.model.verified) {
			user.clear();
			return {
				error: true,
				notification:
					'Your account has not been verified. Please check your email for a verification link.'
			};
		}
		throw redirect(303, '/');
	}
} satisfies Actions;
