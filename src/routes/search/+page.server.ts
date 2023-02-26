import { getPosts } from '$lib/data/getPosts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		posts: getPosts()
	};
};
