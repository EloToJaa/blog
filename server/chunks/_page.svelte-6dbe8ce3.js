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
  return `${$$result.head += `<!-- HEAD_svelte-kxjkt8_START -->${$$result.title = `<title>Sign in</title>`, ""}<!-- HEAD_svelte-kxjkt8_END -->`, ""}

<form class="flex flex-col space-y-6" method="POST"><h3>Sign in</h3>
	${validate_component(FormInput, "FormInput").$$render(
    $$result,
    {
      name: "usernameOrEmail",
      value: form?.usernameOrEmail,
      messages: form?.messages?.usernameOrEmail,
      label: "Username or email",
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
	${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "w-full1" }, {}, {
    default: () => {
      return `Login to your account`;
    }
  })}
	<div class="text-md font-medium text-gray-500 dark:text-gray-300">Not registered? <a href="/register" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a></div>
	<div class="text-md font-medium text-gray-500 dark:text-gray-300">Forgot password? <a href="/password-reset" class="text-blue-700 hover:underline dark:text-blue-500">Reset password</a></div>
	<div class="text-md font-medium text-gray-500 dark:text-gray-300">Not verified? <a href="/verification" class="text-blue-700 hover:underline dark:text-blue-500">Resend email</a></div></form>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-6dbe8ce3.js.map
