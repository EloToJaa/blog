import { checkIfAccessTokenExpired, getAccessToken } from '$lib/token/accessToken';
import type { Handle, HandleFetch } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle = (async ({ event, resolve }) => {
	await checkIfAccessTokenExpired();

	// get data from access token
	const accessToken = getAccessToken();
	if (accessToken) {
		console.log(jwt.decode(accessToken));
	} else {
		event.locals.user = null;
	}

	const response = await resolve(event);

	// set cookie header for refresh token
	response.headers.set('set-cookie', 'name=value');
	const refreshToken = event.request.headers.get('cookie');
	if (refreshToken) {
		response.headers.set('set-cookie', refreshToken);
	}
	return response;
}) satisfies Handle;

export const handleFetch = (({ request, fetch }) => {
	if (request.url.startsWith('http://localhost:3000/')) {
		const accessToken = getAccessToken();
		if (accessToken) {
			request.headers.set('Authorization', `Bearer ${accessToken}`);
		}
	}

	return fetch(request);
}) satisfies HandleFetch;
