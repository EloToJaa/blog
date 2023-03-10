import { c as create_ssr_component, v as validate_component } from './index3-8d921900.js';
import { B as Button } from './Indicator.svelte_svelte_type_style_lang-19183851.js';
import './_commonjsHelpers-7d1333e8.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-kw211n_START -->${$$result.title = `<title>Confirm your email</title>`, ""}<!-- HEAD_svelte-kw211n_END -->`, ""}

<h1>Email confimed</h1>
${validate_component(Button, "Button").$$render(
    $$result,
    {
      href: "/login",
      size: "lg",
      class: "mt-2"
    },
    {},
    {
      default: () => {
        return `Sign In`;
      }
    }
  )}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-750a8ff6.js.map
