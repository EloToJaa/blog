import type UserType from '$lib/types/User';
import { serializeNonPOJOs } from '$lib/utils/helpers';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

// export const load = (({ locals }) => {}) satisfies PageServerLoad;

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

		const user = serializeNonPOJOs(locals.pocketBase.authStore.model) as UserType;
		if (!user.id) throw redirect(303, '/login');
		formData.set('author', user.id);

		const data = Object.fromEntries([...formData]);
		console.log(data);
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

		throw redirect(303, `/blog/${data.slug}`);

		// return {
		// 	notification,
		// 	messages,
		// 	status: res.status,
		// 	title: formData.get('title') as string,
		// 	description: formData.get('description') as string,
		// 	content: formData.get('content') as string,
		// 	date: formData.get('date') as string
		// };
	}
} satisfies Actions;
