import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ locals, params }) => {
	const postSlug = params.slug;
	const posts = locals.pocketBase.collection('posts');
	const post = await posts.getFirstListItem(`slug="${postSlug}"`);
	if (!post) throw redirect(303, '/');
	if (post.author !== locals.pocketBase.authStore.model?.id) throw redirect(303, '/');
	await posts.delete(post.id);
	throw redirect(303, '/');
}) satisfies RequestHandler;
