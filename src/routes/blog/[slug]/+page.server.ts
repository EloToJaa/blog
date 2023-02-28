import { getPost } from '$lib/data/Post';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const post = await getPost(fetch, params.slug);
	if (post == null) throw error(404, 'Article not found');
	return {
		post: post
	};
}) satisfies PageServerLoad;
