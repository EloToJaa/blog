import { checkIfAccessTokenExpired, getAccessToken, setAccessToken } from '$lib/token/accessToken';
import type { Handle, HandleFetch } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle = (async ({ event, resolve }) => {
	// get cookie authToken
	const cookies = event.request.headers.get('cookie');
	if (cookies) {
		await checkIfAccessTokenExpired(cookies);
	} else {
		setAccessToken(null);
	}

	// get data from access token
	const accessToken = getAccessToken();
	if (accessToken) {
		event.locals.user = jwt.decode(accessToken);
	} else {
		event.locals.user = null;
	}

	const response = await resolve(event);

	return response;
}) satisfies Handle;

export const handleFetch = (async ({ request, fetch }) => {
	if (request.url.startsWith('http://localhost:3000/')) {
		const accessToken = getAccessToken();
		if (accessToken) {
			request.headers.set('Authorization', `Bearer ${accessToken}`);
		}
	}

	return fetch(request);
}) satisfies HandleFetch;
