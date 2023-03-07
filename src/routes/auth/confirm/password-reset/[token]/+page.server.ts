import type Messages from '$lib/types/Messages';
import { convertMessagesFromPocketBase } from '$lib/utils/helpers';
import PasswordValidation from '$lib/validation/password';
import type { Actions } from './$types';

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
			await users.confirmPasswordReset(
				token,
				data.password as string,
				data.passwordConfirm as string
			);
			return {
				notification: 'Your password has been reset. You can now log in with your new password.',
				error: false
			};
		} catch (err: object | any) {
			return {
				error: true,
				notification: 'Reset password token is invalid or has expired.',
				messages: convertMessagesFromPocketBase(err) as Messages
			};
		}
	}
} satisfies Actions;
