import { c as create_ssr_component, v as validate_component } from './index3-8d921900.js';
import { n as notify, F as FormInput } from './notification-1ae2bfd2.js';
import { B as Button } from './Indicator.svelte_svelte_type_style_lang-e7e27c71.js';
import './Label-5025b584.js';
import './Input-979dea64.js';
import './Wrapper-d29eca5d.js';
import './Toaster.svelte_svelte_type_style_lang-7966b34d.js';
import './index2-1f09def0.js';

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
//# sourceMappingURL=_page.svelte-a6534701.js.map
