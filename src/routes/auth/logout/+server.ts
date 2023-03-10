import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ locals }) => {
	locals.pocketBase.authStore.clear();
	throw redirect(303, '/');
}) satisfies RequestHandler;
