import { checkIfAccessTokenExpired, getAccessToken } from '$lib/token/accessToken';
import type { Handle, HandleFetch } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	checkIfAccessTokenExpired();

	// get data from access token
	const accessToken = getAccessToken();
	// if (accessToken) {
	//     event.locals.user =
	// }

	const response = await resolve(event);
	return response;
}) satisfies Handle;

export const handleFetch = (({ event, request, fetch }) => {
	if (request.url.startsWith('http://localhost:3000/')) {
		const accessToken = getAccessToken();
		if (accessToken) {
			request.headers.set('Authorization', `Bearer ${accessToken}`);
		}
		const refreshToken = event.request.headers.get('authToken');
		if (refreshToken) {
			request.headers.set('authToken', refreshToken);
		}
	}

	return fetch(request);
}) satisfies HandleFetch;
