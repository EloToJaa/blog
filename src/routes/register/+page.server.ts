import { convertMessagesFromPocketBase } from '$lib/utils/helpers';
import RegisterValidation from '$lib/validation/register';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';

export const load = (({ locals }) => {
	if (locals.pocketBase.authStore.isValid) {
		throw redirect(303, '/');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);
		const errorObject = {
			error: true,
			notification: 'An error occurred while creating your account. Please try again.',
			email: data.email as string,
			username: data.username as string
		};

		// register validation
		const result = RegisterValidation.safeParse(data);
		if (!result.success) {
			return {
				...errorObject,
				messages: result.error.flatten().fieldErrors
			};
		}

		try {
			const users = locals.pocketBase.collection('users');
			await users.create(data);

			await users.authWithPassword(data.email as string, data.password as string);

			locals.pocketBase.authStore.clear();
		} catch (err: object | any) {
			return {
				...errorObject,
				messages: convertMessagesFromPocketBase(err)
			};
		}

		throw redirect(303, '/login');
	}
} satisfies Actions;
