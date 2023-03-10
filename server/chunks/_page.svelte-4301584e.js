import { c as create_ssr_component, v as validate_component } from './index3-8d921900.js';
import { P as Posts } from './Posts-c2676e7f.js';
import './getDate-8c6d4f59.js';
import './fa-aaeaa1a9.js';
import './Indicator.svelte_svelte_type_style_lang-e7e27c71.js';
import './index2-1f09def0.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1anpopb_START -->${$$result.title = `<title>Home</title>`, ""}<!-- HEAD_svelte-1anpopb_END -->`, ""}

${validate_component(Posts, "Posts").$$render($$result, { posts: data.posts }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-4301584e.js.map
