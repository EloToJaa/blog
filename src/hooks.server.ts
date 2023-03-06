import { checkIfAccessTokenExpired } from '$lib/token/accessToken';
import { error, type Handle, type HandleFetch } from '@sveltejs/kit';
import { parse } from 'cookie';

export const handle = (async ({ event, resolve }) => {
	const cookies = event.request.headers.get('cookie');
	const refreshToken = cookies ? parse(cookies).authToken : null;
	const authorization = event.request.headers.get('Authorization');
	let accessToken = authorization ? authorization.split(' ')[1] : null;
	if (refreshToken) {
		accessToken = await checkIfAccessTokenExpired(refreshToken, accessToken);
	}

	event.locals.accessToken = accessToken;

	// protect routes
	if (event.request.url.startsWith('/article')) {
		if (!accessToken) {
			throw error(401, 'Unauthorized');
		}
	}

	const response = await resolve(event);

	return response;
}) satisfies Handle;

export const handleFetch = (async ({ request, fetch, event }) => {
	if (request.url.startsWith('http://localhost:3000/')) {
		const accessToken = event.locals.accessToken;
		if (accessToken) {
			request.headers.set('Authorization', `Bearer ${accessToken}`);
		}
	}

	return fetch(request);
}) satisfies HandleFetch;
