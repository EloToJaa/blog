import type PostType from '$lib/types/Post';
import type UserType from '$lib/types/User';
import { serializeNonPOJOs } from '$lib/utils/helpers';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const posts = locals.pocketBase.collection('posts');
	const postsList = await posts.getFullList({
		sort: 'posted_at',
		order: 'desc',
		filter: `posted_at<='${new Date().toISOString()}'`,
		expand: 'author'
	});
	// for each post add slug
	const newPosts: PostType[] = [];
	postsList.forEach((post) => {
		const author = serializeNonPOJOs(post.expand.author) as UserType;
		newPosts.push({
			author: author.username,
			posted_at: post.posted_at,
			slug: post.slug,
			title: post.title,
			description: post.description
		} as PostType);
	});

	return {
		posts: newPosts
	};
}) satisfies PageServerLoad;
