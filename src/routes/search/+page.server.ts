import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const getPosts = async () => {
		const res = await fetch('http://localhost:3000/posts/');
		const posts = await res.json();
		return posts;
	};
	return {
		posts: getPosts()
	};
};
