import type PostType from '$lib/types/Post';
import type UserType from '$lib/types/User';
import { serializeNonPOJOs } from '$lib/utils/helpers';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	try {
		const posts = locals.pocketBase.collection('posts');
		const post = await posts.getFirstListItem(`slug="${params.slug}"`, { expand: 'author' });
		const author = serializeNonPOJOs(post.expand.author) as UserType;
		const newPost = {
			author: author.username,
			posted_at: post.posted_at,
			slug: post.slug,
			title: post.title,
			content: post.content
		} as PostType;
		return {
			post: newPost
		};
	} catch (err) {
		console.log(err);
		throw error(404, 'Post not found');
	}
}) satisfies PageServerLoad;
