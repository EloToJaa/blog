import type Messages from '$lib/types/Messages';
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

		const result = RegisterValidation.safeParse(data);
		if (!result.success) {
			return {
				...errorObject,
				messages: result.error.flatten().fieldErrors as Messages
			};
		}

		try {
			const users = locals.pocketBase.collection('users');
			await users.create(data);
			await users.requestVerification(data.email as string);
			return {
				notification:
					'Your account has been created. Please check your email to verify your account.',
				error: false
			};
		} catch (err: object | any) {
			return {
				...errorObject,
				messages: convertMessagesFromPocketBase(err) as Messages
			};
		}
	}
} satisfies Actions;
