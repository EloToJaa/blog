import type { Actions, PageServerLoad } from '../$types';

export const load = (async ({ params }) => {
	const res = await fetch(`http://localhost:3000/auth/login`, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			usernameOrEmail: 'test',
			password: 'Testowanie123#'
		})
	});
	const data = await res.json();

	const accessToken: string = data.accessToken;
	const message: string = data.message;
	const cookies = res.headers.get('set-cookie');

	console.log(cookies);

	return {
		accessToken,
		message
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
	}
} satisfies Actions;
