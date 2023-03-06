import type PostType from '$lib/types/Post';
import type UserType from '$lib/types/User';
import { serializeNonPOJOs } from '$lib/utils/helpers';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const posts = locals.pocketBase.collection('posts');
	const postsList = await posts.getFullList({
		sort: 'postedAt',
		order: 'desc',
		filter: `postedAt<='${new Date().toISOString()}'`,
		expand: 'author'
	});
	// for each post add slug
	const newPosts: PostType[] = [];
	postsList.forEach((post) => {
		const author = serializeNonPOJOs(post.expand.author) as UserType;
		newPosts.push({
			author: author.username,
			postedAt: post.postedAt,
			slug: post.slug,
			title: post.title,
			description: post.description
		} as PostType);
	});

	return {
		posts: newPosts
	};
}) satisfies PageServerLoad;
