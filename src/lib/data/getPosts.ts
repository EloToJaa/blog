import type { PostType } from '$lib/types/Post';

export const getPosts = async () => {
	const res = await fetch('http://localhost:3000/posts/');
	const posts: Promise<PostType[]> = await res.json();
	return posts;
};
