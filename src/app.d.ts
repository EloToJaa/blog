// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import UserType from '$lib/types/User';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: UserType | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
