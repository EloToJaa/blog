import { writable } from 'svelte/store';

export interface SearchStoreModel<T extends Record<PropertyKey, any>> {
	data: T[];
	filtered: T[];
	search: string;
}

export type Post = {
	title: string;
	content: string;
	author: string;
	date: Date;
	searchTerms: string;
};

export const createSearchObject = <T extends Record<PropertyKey, any>>(data: T[]) => {
	return {
		data,
		filtered: data,
		search: ''
	};
};

const createSearchStore = <T extends Record<PropertyKey, any>>(data: T[]) => {
	const store = writable<SearchStoreModel<T>>(createSearchObject(data));

	return store;
};

export const searchStore = createSearchStore([] as Post[]);

export const searchHandler = <T extends Record<PropertyKey, any>>(store: SearchStoreModel<T>) => {
	const searchTerm = store.search.toLowerCase() || '';
	store.filtered = store.data.filter((item) => {
		return item.searchTerms.toLowerCase().includes(searchTerm);
	});
};
