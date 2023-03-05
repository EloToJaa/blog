import type Messages from '$lib/types/Messages';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

// export const load = (() => {}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		formData.set('date', `${formData.get('date')}:00Z`);

		const data = Object.fromEntries(formData);
		const res = await fetch('http://localhost:3000/posts', {
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
			throw redirect(303, `/blog/${obj.slug}`);
		}

		return {
			notification,
			messages,
			status: res.status,
			title: formData.get('email') as string,
			description: formData.get('username') as string,
			content: formData.get('content') as string,
			date: formData.get('date') as string
		};
	}
} satisfies Actions;
