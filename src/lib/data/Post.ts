import type LoadFetch from '$lib/types/LoadFetch';
import type PostType from '$lib/types/Post';

export const getPosts = async (fetch: LoadFetch) => {
	const res = await fetch('http://localhost:3000/posts/');
	const posts: Promise<PostType[]> = await res.json();
	return posts;
};

export const getPost = async (fetch: LoadFetch, slug: string) => {
	const res = await fetch(`http://localhost:3000/posts/${slug}`);
	if (res.status === 404) return null;
	const post: Promise<PostType> = await res.json();
	return post;
};
