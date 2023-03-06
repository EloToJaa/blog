// import { getAccessToken, setAccessToken } from '$lib/token/accessToken';
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

		try {
			const users = locals.pocketBase.collection('users');
			await users.authWithPassword(data.usernameOrEmail as string, data.password as string);
		} catch (err) {
			console.log(err);
			return {
				error: true,
				notification: 'An error occurred while logging in. Please try again.'
			};
		}
		throw redirect(303, '/');

		// return {
		// 	notification,
		// 	messages,
		// 	status: res.status,
		// 	username: formData.get('username') as string
		// };
	}
} satisfies Actions;
