import { env } from '$env/dynamic/private';
import type UserType from '$lib/types/User';
import { checkPermissions } from '$lib/utils/helpers';
import { error, type Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle = (async ({ event, resolve }) => {
	event.locals.pocketBase = new PocketBase(env.POCKETBASE_URL);
	const authStore = event.locals.pocketBase.authStore;
	authStore.loadFromCookie(event.request.headers.get('Cookie') || '');

	['/user', '/article'].forEach((path) => {
		if (event.url.pathname.startsWith(path)) {
			if (!authStore.isValid) {
				throw error(401, 'Unauthorized');
			}
		}
	});

	['/article'].forEach((path) => {
		if (event.url.pathname.startsWith(path)) {
			if (!checkPermissions(['post'], authStore.model as UserType)) {
				throw error(401, 'Unauthorized');
			}
		}
	});

	const response = await resolve(event);

	response.headers.set(
		'Set-Cookie',
		authStore.exportToCookie({
			path: '/',
			secure: false
		})
	);

	return response;
}) satisfies Handle;
