import { c as create_ssr_component, v as validate_component } from './index3-8d921900.js';
import { B as Button } from './Indicator.svelte_svelte_type_style_lang-e7e27c71.js';

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
//# sourceMappingURL=_page.svelte-f408e5e4.js.map
