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
  return `${$$result.head += `<!-- HEAD_svelte-f1nrop_START -->${$$result.title = `<title>Register</title>`, ""}<!-- HEAD_svelte-f1nrop_END -->`, ""}

<form class="flex flex-col space-y-6" method="POST"><h3>Create a new account</h3>
	${validate_component(FormInput, "FormInput").$$render(
    $$result,
    {
      name: "username",
      value: form?.username,
      messages: form?.messages?.username,
      placeholder: "name"
    },
    {},
    {}
  )}
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
	${validate_component(FormInput, "FormInput").$$render(
    $$result,
    {
      name: "password",
      type: "password",
      messages: form?.messages?.password
    },
    {},
    {}
  )}
	${validate_component(FormInput, "FormInput").$$render(
    $$result,
    {
      name: "passwordConfirm",
      type: "password",
      messages: form?.messages?.passwordConfirm
    },
    {},
    {}
  )}
	${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "w-full1" }, {}, {
    default: () => {
      return `Register`;
    }
  })}</form>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-c6aab921.js.map
