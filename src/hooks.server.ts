import { checkIfAccessTokenExpired, getAccessToken } from '$lib/token/accessToken';
import type { Handle, HandleFetch } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle = (async ({ event, resolve }) => {
	checkIfAccessTokenExpired();

	// get data from access token
	const accessToken = getAccessToken();
	if (accessToken) {
		console.log(jwt.decode(accessToken));
	} else {
		event.locals.user = null;
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;

export const handleFetch = (({ event, request, fetch }) => {
	if (request.url.startsWith('http://localhost:3000/')) {
		const accessToken = getAccessToken();
		if (accessToken) {
			request.headers.set('Authorization', `Bearer ${accessToken}`);
		}
		const refreshToken = event.request.headers.get('cookie');
		if (refreshToken) {
			// set cookie header for refresh token
			request.headers.set('set-cookie', refreshToken);
		}
	}

	return fetch(request);
}) satisfies HandleFetch;
