import { getPosts } from '$lib/data/Post';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	return {
		posts: getPosts(fetch)
	};
}) satisfies PageServerLoad;
