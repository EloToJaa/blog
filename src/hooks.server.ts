import { env } from '$env/dynamic/private';
import { error, type Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle = (async ({ event, resolve }) => {
	console.log(env.POCKETBASE_URL);
	event.locals.pocketBase = new PocketBase(env.POCKETBASE_URL);
	event.locals.pocketBase.authStore.loadFromCookie(event.request.headers.get('Cookie') || '');

	const protectedPaths = ['/article', '/user'];
	protectedPaths.forEach((path) => {
		if (event.url.pathname.startsWith(path)) {
			if (!event.locals.pocketBase.authStore.isValid) {
				throw error(401, 'Unauthorized');
			}
		}
	});

	const response = await resolve(event);

	response.headers.set(
		'Set-Cookie',
		event.locals.pocketBase.authStore.exportToCookie({ path: '/', secure: false })
	);

	return response;
}) satisfies Handle;
