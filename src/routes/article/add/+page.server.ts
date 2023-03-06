import type UserType from '$lib/types/User';
import { convertMessagesFromPocketBase, serializeNonPOJOs } from '$lib/utils/helpers';
import PostValidation from '$lib/validation/post';
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
		const errorObject = {
			error: true,
			notification: 'An error occurred while creating the post. Please try again.',
			title: data.title as string,
			description: data.description as string,
			content: data.content as string,
			date: data.postedAt as string
		};

		// post validation
		const result = PostValidation.safeParse(data);
		if (!result.success) {
			console.log(result.error.flatten().fieldErrors);
			return {
				...errorObject,
				messages: result.error.flatten().fieldErrors
			};
		}

		try {
			const posts = locals.pocketBase.collection('posts');
			await posts.create(data);
		} catch (err: object | any) {
			return {
				...errorObject,
				messages: convertMessagesFromPocketBase(err)
			};
		}

		throw redirect(303, `/blog/${data.slug}`);
	}
} satisfies Actions;
