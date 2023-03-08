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
  let { data } = $$props;
  let { form } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  {
    notify(form?.notification, form?.error);
  }
  return `${$$result.head += `<!-- HEAD_svelte-1sp6mfu_START -->${$$result.title = `<title>Update an article</title>`, ""}<!-- HEAD_svelte-1sp6mfu_END -->`, ""}

<form class="${"flex flex-col space-y-6"}" method="${"POST"}"><h3>Update an article</h3>
	${validate_component(FormInput, "FormInput").$$render(
    $$result,
    {
      name: "title",
      value: form?.title ?? data.title,
      messages: form?.messages?.title
    },
    {},
    {}
  )}
	${validate_component(FormInput, "FormInput").$$render(
    $$result,
    {
      textarea: true,
      name: "description",
      value: form?.description ?? data?.description,
      messages: form?.messages?.description
    },
    {},
    {}
  )}

	${validate_component(FormInput, "FormInput").$$render(
    $$result,
    {
      textarea: true,
      name: "content",
      value: form?.content ?? data?.content,
      messages: form?.messages?.content,
      rows: 10
    },
    {},
    {}
  )}

	${validate_component(FormInput, "FormInput").$$render(
    $$result,
    {
      type: "datetime-local",
      name: "postedAt",
      label: "Posted at",
      value: form?.postedAt ?? data?.postedAt,
      messages: form?.messages?.postedAt
    },
    {},
    {}
  )}

	${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "w-full" }, {}, {
    default: () => {
      return `Update the article`;
    }
  })}</form>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-1b66e3b9.js.map
