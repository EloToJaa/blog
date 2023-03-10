import { c as create_ssr_component, v as validate_component } from './index3-8d921900.js';
import { n as notify, F as FormInput } from './notification-a02193db.js';
import { B as Button } from './Indicator.svelte_svelte_type_style_lang-19183851.js';
import './Label-2d725e84.js';
import './Input-3374cd4d.js';
import './Wrapper-d29eca5d.js';
import './Toaster.svelte_svelte_type_style_lang-7966b34d.js';
import './index2-1f09def0.js';
import './_commonjsHelpers-7d1333e8.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  {
    notify(form?.notification, form?.error);
  }
  return `${$$result.head += `<!-- HEAD_svelte-dyp4wv_START -->${$$result.title = `<title>Verification</title>`, ""}<!-- HEAD_svelte-dyp4wv_END -->`, ""}

<form class="flex flex-col space-y-6" method="POST"><h3>Resend verification email</h3>
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
      return `Resend`;
    }
  })}</form>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-214a60fb.js.map
