import { env } from '$env/dynamic/private';
import type Messages from '$lib/types/Messages';
import type UserType from '$lib/types/User';
import { formatContent, sanitizeContent } from '$lib/utils/format';
import {
	convertMessagesFromPocketBase,
	parseDateFromInput,
	serializeNonPOJOs
} from '$lib/utils/helpers';
import PostValidation from '$lib/validation/post';
import type { Actions } from './$types';

// export const load = (({ locals }) => {}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		formData.set(
			'slug',
			formData.get('title')?.toString().toLowerCase().replace(/ /g, '-') as string
		);

		formData.set('postedAt', parseDateFromInput(formData.get('postedAt') as string));

		const user = serializeNonPOJOs(locals.pocketBase.authStore.model) as UserType;
		// if (!user.id) throw redirect(303, '/login');
		formData.set('author', user.id as string);

		formData.set('unformattedContent', sanitizeContent(formData.get('content') as string));
		formData.set('content', formatContent(formData.get('content') as string));

		const data = Object.fromEntries([...formData]);
		console.log(data);
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
		console.log(result);
		console.log(env.NODE_ENV);
		if (!result.success) {
			return {
				...errorObject,
				messages: result.error.flatten().fieldErrors as Messages
			};
		}

		try {
			const posts = locals.pocketBase.collection('posts');
			await posts.create(data);
		} catch (err: object | any) {
			console.log(err);
			return {
				...errorObject,
				messages: convertMessagesFromPocketBase(err) as Messages
			};
		}

		// throw redirect(303, `/blog/${data.slug}`);
	}
} satisfies Actions;
