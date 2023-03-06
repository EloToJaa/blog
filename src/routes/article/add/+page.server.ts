import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

// export const load = (() => {}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		formData.set(
			'slug',
			formData.get('title')?.toString().toLowerCase().replace(/ /g, '-') as string
		);
		let date: string = formData.get('postedAt') as string;
		date = date.replace(' ', 'T');
		date = date + ':00Z';
		formData.set('postedAt', date);
		const data = Object.fromEntries([...formData]);

		try {
			const posts = locals.pocketBase.collection('posts');
			await posts.create(data);
		} catch (err) {
			console.log(err);
			return {
				error: true,
				notification: 'An error occurred while creating the post. Please try again.'
			};
		}

		if (res.status === 201) {
			throw redirect(303, `/blog/${obj.slug}`);
		}

		return {
			notification,
			messages,
			status: res.status,
			title: formData.get('title') as string,
			description: formData.get('description') as string,
			content: formData.get('content') as string,
			date: formData.get('date') as string
		};
	}
} satisfies Actions;
