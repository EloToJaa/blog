import { convertMessagesFromPocketBase } from '$lib/utils/helpers';
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
				messages: result.error.flatten().fieldErrors
			};
		}

		try {
			const users = locals.pocketBase.collection('users');
			await users.authWithPassword(data.usernameOrEmail as string, data.password as string);
		} catch (err: object | any) {
			return {
				...errorObject,
				messages: convertMessagesFromPocketBase(err)
			};
		}
		throw redirect(303, '/');
	}
} satisfies Actions;
