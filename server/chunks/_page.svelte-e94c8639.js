import { c as create_ssr_component, v as validate_component } from './index3-4f698b40.js';
import { P as Posts } from './Posts-25045f6d.js';
import './getDate-8c6d4f59.js';
import './fa-65609c29.js';
import './Indicator.svelte_svelte_type_style_lang-bbc32287.js';
import './_commonjsHelpers-849bcf65.js';
import './index2-5a9cf22e.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1anpopb_START -->${$$result.title = `<title>Home</title>`, ""}<!-- HEAD_svelte-1anpopb_END -->`, ""}

${validate_component(Posts, "Posts").$$render($$result, { posts: data.posts }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-e94c8639.js.map
