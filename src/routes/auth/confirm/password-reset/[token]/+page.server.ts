import type Messages from '$lib/types/Messages';
import { convertMessagesFromPocketBase } from '$lib/utils/helpers';
import PasswordValidation from '$lib/validation/password';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const token = params.token;
	try {
		const users = locals.pocketBase.collection('users');
		await users.confirmVerification(token);
		return;
	} catch (err) {
		console.error(err);
	}
	throw redirect(303, '/');
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request, params }) => {
		const token = params.token as string;
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);
		const errorObject = {
			error: true,
			notification: 'An error occurred while resetting password. Please try again.'
		};

		// validation
		const result = PasswordValidation.safeParse(data);
		if (!result.success) {
			return {
				...errorObject,
				messages: result.error.flatten().fieldErrors as Messages
			};
		}

		try {
			const users = locals.pocketBase.collection('users');
			users.confirmPasswordReset(token, data.password as string, data.passwordConfirm as string);
			return {
				notification: 'Your password has been reset. You can now log in with your new password.',
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
