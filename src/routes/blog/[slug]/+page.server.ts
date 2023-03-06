import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const posts = locals.pocketBase.collection('posts');
	const post = await posts.getFirstListItem(`slug="${params.slug}"`, { expand: 'author' });
	if (post == null) throw error(404, 'Article not found');
	return {
		post: post
	};
}) satisfies PageServerLoad;
