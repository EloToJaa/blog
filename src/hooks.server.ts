import { error, type Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle = (async ({ event, resolve }) => {
	event.locals.pocketBase = new PocketBase('http://127.0.0.1:8090');
	event.locals.pocketBase.authStore.loadFromCookie(event.request.headers.get('Cookie') || '');

	if (event.url.pathname.startsWith('/article') || event.url.pathname.startsWith('/api')) {
		if (!event.locals.pocketBase.authStore.isValid) {
			throw error(401, 'Unauthorized');
		}
	}

	const response = await resolve(event);

	response.headers.set(
		'Set-Cookie',
		event.locals.pocketBase.authStore.exportToCookie({ path: '/', secure: false })
	);

	return response;
}) satisfies Handle;
