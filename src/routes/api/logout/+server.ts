import { setAccessToken } from '$lib/token/accessToken';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ fetch, cookies }) => {
	await fetch('http://localhost:3000/auth/logout', {
		method: 'DELETE'
	});
	cookies.delete('authToken', { path: '/' });
	setAccessToken(null);
	throw redirect(303, '/');
}) satisfies RequestHandler;
