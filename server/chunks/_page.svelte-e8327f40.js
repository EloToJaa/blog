import { c as create_ssr_component, v as validate_component } from './index3-4f698b40.js';
import { n as notify, F as FormInput } from './notification-f6ffebd5.js';
import { B as Button } from './Indicator.svelte_svelte_type_style_lang-bbc32287.js';
import './Label-db150428.js';
import './Input-1a3ac9f8.js';
import './Wrapper-73f6292b.js';
import './Toaster.svelte_svelte_type_style_lang-71c236cf.js';
import './index2-5a9cf22e.js';
import './_commonjsHelpers-849bcf65.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  {
    notify(form?.notification, form?.error);
  }
  return `${$$result.head += `<!-- HEAD_svelte-wnoeo8_START -->${$$result.title = `<title>Reset password</title>`, ""}<!-- HEAD_svelte-wnoeo8_END -->`, ""}

<form class="${"flex flex-col space-y-6"}" method="${"POST"}"><h3>Reset password</h3>
	${validate_component(FormInput, "FormInput").$$render(
    $$result,
    {
      name: "email",
      value: form?.email,
      messages: form?.messages?.email,
      placeholder: "name@gmail.com"
    },
    {},
    {}
  )}
	${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "w-full1" }, {}, {
    default: () => {
      return `Reset`;
    }
  })}</form>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-e8327f40.js.map
