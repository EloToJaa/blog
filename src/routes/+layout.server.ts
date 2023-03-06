import { serializeNonPOJOs } from '$lib/utils/helpers';
import type { LayoutServerLoad } from './$types';

export const load = (({ locals }) => {
	const user = serializeNonPOJOs(locals.pocketBase.authStore.model);
	return {
		user
	};
}) satisfies LayoutServerLoad;
