import { c as create_ssr_component, v as validate_component } from './index3-8d921900.js';
import { n as notify, F as FormInput } from './notification-a02193db.js';
import { B as Button } from './Indicator.svelte_svelte_type_style_lang-19183851.js';
import { M as Modal } from './Modal-3f99c0f7.js';
import './Label-2d725e84.js';
import './Input-3374cd4d.js';
import './Wrapper-d29eca5d.js';
import './Toaster.svelte_svelte_type_style_lang-7966b34d.js';
import './index2-1f09def0.js';
import './_commonjsHelpers-7d1333e8.js';
import './ToolbarButton-20ae584c.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  let preview = form?.preview ?? false;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      notify(form?.notification, form?.error);
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-a3md8s_START -->${$$result.title = `<title>New article</title>`, ""}<!-- HEAD_svelte-a3md8s_END -->`, ""}

<form class="flex flex-col space-y-6" method="POST" action="?/create"><h3>Create an article</h3>
	${validate_component(FormInput, "FormInput").$$render(
      $$result,
      {
        name: "title",
        value: form?.title,
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
        value: form?.description,
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
        value: form?.content,
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
        value: form?.postedAt,
        messages: form?.messages?.postedAt
      },
      {},
      {}
    )}

	<button formaction="?/preview" class="bg-green-600 py-2 rounded-lg">Preview the article</button>
	${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
      default: () => {
        return `Create the article`;
      }
    })}</form>

${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: `Title: ${form?.title}`,
        size: "lg",
        autoclose: true,
        open: preview
      },
      {
        open: ($$value) => {
          preview = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `${validate_component(Button, "Button").$$render($$result, { color: "red" }, {}, {
            default: () => {
              return `Close`;
            }
          })}
	`;
        },
        default: () => {
          return `<p><!-- HTML_TAG_START -->${form?.formattedContent}<!-- HTML_TAG_END --></p>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-6ac2e85f.js.map
