import { redirect } from '@sveltejs/kit';
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
