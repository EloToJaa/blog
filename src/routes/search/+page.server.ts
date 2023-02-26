import { getPosts } from '$lib/data/Post';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		posts: getPosts()
	};
};
