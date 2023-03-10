import { c as create_ssr_component, e as escape, b as add_attribute, v as validate_component } from './index3-8d921900.js';
import { g as getDate } from './getDate-8c6d4f59.js';
import { B as Button } from './Indicator.svelte_svelte_type_style_lang-e7e27c71.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const post = data.post;
  const user = data.user;
  const date = getDate(data.post.postedAt || "");
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1uty71u_START -->${$$result.title = `<title>${escape(post.title)}</title>`, ""}<!-- HEAD_svelte-1uty71u_END -->`, ""}

<div class="mb-2 mx-auto dark:bg-gray-900 bg-blue-50 p-5 border-0 rounded-2xl pb-7"><div class="flex justify-between"><h1>${escape(post.title)}</h1>
		${user && user.id && user.id === post.authorId ? `<form${add_attribute("action", `/article/delete/${post.slug}`, 0)} method="POST">${validate_component(Button, "Button").$$render(
    $$result,
    {
      href: `/article/edit/${post.slug}`,
      class: "mb-2"
    },
    {},
    {
      default: () => {
        return `Edit`;
      }
    }
  )}
				${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "submit",
      class: "mb-2",
      color: "red"
    },
    {},
    {
      default: () => {
        return `Delete`;
      }
    }
  )}</form>` : ``}</div>

	<h5>${escape(date)} | ${escape(post.author)}</h5>
	<p><!-- HTML_TAG_START -->${post.content}<!-- HTML_TAG_END --></p></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-b94d5871.js.map
