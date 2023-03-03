import { getAccessToken, setAccessToken } from '$lib/token/accessToken';
import type Messages from '$lib/types/Messages';
import { redirect } from '@sveltejs/kit';
import { parse } from 'cookie';
import type { Actions, PageServerLoad } from '../$types';

export const load = (({ locals }) => {
	if (getAccessToken()) {
		throw redirect(303, '/');
	}
	return { user: locals.user };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);
		const res = await fetch('http://localhost:3000/auth/login', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const obj = await res.json();
		const accessToken: string = obj.accessToken;
		const notification: string | null = obj.notification;
		const messages: Messages = obj.message;
		// const username = formData.get('username') as string;
		const newCookies = res.headers.get('set-cookie');
		setAccessToken(accessToken);
		if (newCookies) {
			const parsedCookies = parse(newCookies);
			cookies.set('authToken', parsedCookies.authToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7
			});
		}
		return {
			notification,
			messages,
			status: res.status
		};
	}
} satisfies Actions;
