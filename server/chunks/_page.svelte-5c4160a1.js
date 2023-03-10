import { c as create_ssr_component, v as validate_component } from './index3-8d921900.js';
import { n as notify, F as FormInput } from './notification-1ae2bfd2.js';
import { B as Button } from './Indicator.svelte_svelte_type_style_lang-e7e27c71.js';
import './Label-5025b584.js';
import './Input-979dea64.js';
import './Wrapper-d29eca5d.js';
import './Toaster.svelte_svelte_type_style_lang-7966b34d.js';
import './index2-1f09def0.js';

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

<form class="flex flex-col space-y-6" method="POST"><h3>Update an article</h3>
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
//# sourceMappingURL=_page.svelte-5c4160a1.js.map
