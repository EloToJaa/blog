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
  return `${$$result.head += `<!-- HEAD_svelte-kxjkt8_START -->${$$result.title = `<title>Sign in</title>`, ""}<!-- HEAD_svelte-kxjkt8_END -->`, ""}

<form class="${"flex flex-col space-y-6"}" method="${"POST"}"><h3>Sign in</h3>
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
	<div class="${"text-md font-medium text-gray-500 dark:text-gray-300"}">Not registered? <a href="${"/register"}" class="${"text-blue-700 hover:underline dark:text-blue-500"}">Create account</a></div>
	<div class="${"text-md font-medium text-gray-500 dark:text-gray-300"}">Forgot password? <a href="${"/password-reset"}" class="${"text-blue-700 hover:underline dark:text-blue-500"}">Reset password</a></div>
	<div class="${"text-md font-medium text-gray-500 dark:text-gray-300"}">Not verified? <a href="${"/verification"}" class="${"text-blue-700 hover:underline dark:text-blue-500"}">Resend email</a></div></form>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-624b27b9.js.map
