import EmailValidation from '$lib/validation/email';
import type { Actions } from '../$types';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);
		const errorObject = {
			error: true,
			notification: 'An error occurred while sending email. Please try again.',
			email: data.email as string
		};

		// validation
		const result = EmailValidation.safeParse(data);
		if (!result.success) {
			return {
				...errorObject,
				messages: result.error.flatten().fieldErrors
			};
		}

		try {
			const users = locals.pocketBase.collection('users');
			await users.requestVerification(data.email as string);
		} catch (err: object | any) {
			return errorObject;
		}
		return {
			error: false,
			notification: 'Verification email sent.',
			email: data.email as string
		};
	}
} satisfies Actions;
