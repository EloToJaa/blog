import type Messages from '$lib/types/Messages';
import type PostType from '$lib/types/Post';
import type UserType from '$lib/types/User';
import {
	convertMessagesFromPocketBase,
	parseDateFromInput,
	serializeNonPOJOs
} from '$lib/utils/helpers';
import PostValidation from '$lib/validation/post';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const ssr = false;

export const load = (async ({ locals, params }) => {
	try {
		const posts = locals.pocketBase.collection('posts');
		const post = await posts.getFirstListItem(`slug="${params.slug}"`);
		return {
			postedAt: post.postedAt,
			title: post.title,
			content: post.unformattedContent,
			description: post.description
		} as PostType;
	} catch (err) {
		console.log(err);
		throw error(404, 'Post not found');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals, params }) => {
		const slug = params.slug;
		const formData = await request.formData();
		formData.set(
			'slug',
			formData.get('title')?.toString().toLowerCase().replace(/ /g, '-') as string
		);

		formData.set('postedAt', parseDateFromInput(formData.get('postedAt') as string));

		const user = serializeNonPOJOs(locals.pocketBase.authStore.model) as UserType;
		if (!user.id) throw redirect(303, '/login');
		formData.set('author', user.id);

		// formData.set('content', formatContent(formData.get('content') as string));
		// formData.set('unformattedContent', sanitizeContent(formData.get('content') as string));

		const data = Object.fromEntries([...formData]);
		const errorObject = {
			error: true,
			notification: 'An error occurred while creating the post. Please try again.',
			title: data.title as string,
			description: data.description as string,
			content: data.unformattedContent as string,
			postedAt: data.postedAt as string
		};

		// post validation
		const result = PostValidation.safeParse(data);
		if (!result.success) {
			return {
				...errorObject,
				messages: result.error.flatten().fieldErrors as Messages
			};
		}

		try {
			const posts = locals.pocketBase.collection('posts');
			const post = await posts.getFirstListItem(`slug="${slug}"`);
			await posts.update(post.id, data);
		} catch (err: object | any) {
			console.log(err);
			return {
				...errorObject,
				messages: convertMessagesFromPocketBase(err) as Messages
			};
		}

		throw redirect(303, `/blog/${data.slug}`);
	}
} satisfies Actions;
