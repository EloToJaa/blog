import { c as create_ssr_component, v as validate_component } from './index3-8d921900.js';
import { P as Posts } from './Posts-b13e698a.js';
import './getDate-8c6d4f59.js';
import './fa-aaeaa1a9.js';
import './Indicator.svelte_svelte_type_style_lang-19183851.js';
import './_commonjsHelpers-7d1333e8.js';
import './index2-1f09def0.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1anpopb_START -->${$$result.title = `<title>Home</title>`, ""}<!-- HEAD_svelte-1anpopb_END -->`, ""}

${validate_component(Posts, "Posts").$$render($$result, { posts: data.posts }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-c9ce5b43.js.map
