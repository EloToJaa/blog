import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ locals }) => {
	const userId = locals.pocketBase.authStore.model?.id;
	if (!userId) throw redirect(303, '/');
	const users = locals.pocketBase.collection('users');
	await users.delete(userId);
	locals.pocketBase.authStore.clear();
	throw redirect(303, '/');
}) satisfies RequestHandler;
