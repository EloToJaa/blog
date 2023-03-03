import { getAccessToken } from '$lib/token/accessToken';
import type Messages from '$lib/types/Messages';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';

export const load = (() => {
	if (getAccessToken()) {
		throw redirect(303, '/');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);
		const res = await fetch('http://localhost:3000/auth/register', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const obj = await res.json();
		const notification: string | null = obj.notification;
		const messages: Messages = obj.message;

		if (res.status === 201) {
			throw redirect(303, '/login');
		}

		return {
			notification,
			messages,
			status: res.status,
			email: formData.get('email') as string,
			username: formData.get('username') as string
		};
	}
} satisfies Actions;
