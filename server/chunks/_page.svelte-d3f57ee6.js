import { c as create_ssr_component, e as escape, v as validate_component } from './index3-8d921900.js';
import { P as Posts } from './Posts-b13e698a.js';
import { g as getDate } from './getDate-8c6d4f59.js';
import './fa-aaeaa1a9.js';
import './Indicator.svelte_svelte_type_style_lang-19183851.js';
import './_commonjsHelpers-7d1333e8.js';
import './index2-1f09def0.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const user = data.user;
  const posts = data.posts;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1nku399_START -->${$$result.title = `<title>${escape(user.username)}</title>`, ""}<!-- HEAD_svelte-1nku399_END -->`, ""}

<h1>${escape(user.username)}</h1>
<h4>Joined at ${escape(getDate(user.created))}</h4>

${validate_component(Posts, "Posts").$$render($$result, { posts, author: user.username }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-d3f57ee6.js.map
