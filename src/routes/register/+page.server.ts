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

		try {
			const users = locals.pocketBase.collection('users');
			await users.create(data);

			await users.authWithPassword(data.email as string, data.password as string);

			locals.pocketBase.authStore.clear();
		} catch (err) {
			console.log(err);
			return {
				error: true,
				notification: 'An error occurred while creating your account. Please try again.'
			};
		}

		throw redirect(303, '/login');

		// return {
		// 	notification,
		// 	messages,
		// 	error: false,
		// 	email: formData.get('email') as string,
		// 	username: formData.get('username') as string
		// };
	}
} satisfies Actions;
