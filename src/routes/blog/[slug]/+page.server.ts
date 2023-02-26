import { getPost } from '$lib/data/Post';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPost(params.slug);
	if (post == null) throw error(404, 'Article not found');
	return {
		post: post
	};
};
