import { c as create_ssr_component, a as subscribe, d as each, v as validate_component, e as escape } from './index3-8d921900.js';
import { g as getDate } from './getDate-8c6d4f59.js';
import { F as Fa, d as faArrowRight } from './fa-aaeaa1a9.js';
import { B as Button } from './Indicator.svelte_svelte_type_style_lang-e7e27c71.js';
import { w as writable } from './index2-1f09def0.js';

const Post = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { post } = $$props;
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  return `<div class="mb-2 mx-auto dark:bg-gray-900 bg-blue-50 p-5 border-0 rounded-2xl"><div class="flex justify-between"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${escape(post.title)}</h5>
		${escape(getDate(post.postedAt, true))}</div>

	<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">${escape(post.description)}</p>
	<div class="flex justify-between"><div class="text-lg font-semibold my-auto">${escape(post.author)}</div>
		${validate_component(Button, "Button").$$render($$result, { href: `/blog/${post.slug}` }, {}, {
    default: () => {
      return `Read more
			${validate_component(Fa, "Fa").$$render($$result, { icon: faArrowRight, class: "pl-2" }, {}, {})}`;
    }
  })}</div></div>`;
});
const createSearchObject = (data) => {
  return {
    data,
    filtered: data,
    search: ""
  };
};
const createSearchStore = (data) => {
  const store = writable(createSearchObject(data));
  return store;
};
const searchStore = createSearchStore([]);
const searchHandler = (store) => {
  const searchTerm = store.search.toLowerCase() || "";
  store.filtered = store.data.filter((item) => {
    return item.searchTerms.toLowerCase().includes(searchTerm);
  });
};
const Posts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $searchStore, $$unsubscribe_searchStore;
  $$unsubscribe_searchStore = subscribe(searchStore, (value) => $searchStore = value);
  let { posts } = $$props;
  let { author = null } = $$props;
  if (author) {
    posts = posts.filter((post) => post.author === author);
  }
  const searchPosts = posts.map((post) => ({
    ...post,
    searchTerms: `${post.title} ${post.author} ${post.content}`
  }));
  searchStore.set(createSearchObject(searchPosts));
  if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
    $$bindings.posts(posts);
  if ($$props.author === void 0 && $$bindings.author && author !== void 0)
    $$bindings.author(author);
  {
    searchHandler($searchStore);
  }
  $$unsubscribe_searchStore();
  return `<div class="pt-3">${each($searchStore.filtered, (post) => {
    return `${validate_component(Post, "Post").$$render($$result, { post }, {}, {})}`;
  })}</div>`;
});

export { Posts as P, searchStore as s };
//# sourceMappingURL=Posts-c2676e7f.js.map
