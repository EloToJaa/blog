import { setAccessToken } from '$lib/token/accessToken';
import { parse } from 'cookie';
import type { Actions } from '../$types';

// export const load = (async ({ params }) => {
// 	return {};
// }) satisfies PageServerLoad;

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
		const message: string = obj.message;
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
			console.log(parsedCookies);
		}
	}
} satisfies Actions;
