import { c as create_ssr_component, v as validate_component, f as compute_rest_props, n as getContext, b as add_attribute, g as spread, h as escape_object, i as escape_attribute_value, e as escape, s as setContext } from './index3-8d921900.js';
import { P as Posts } from './Posts-b13e698a.js';
import { g as getDate } from './getDate-8c6d4f59.js';
import { B as Button, c as classNames } from './Indicator.svelte_svelte_type_style_lang-19183851.js';
import { L as Label } from './Label-2d725e84.js';
import { I as Input } from './Input-3374cd4d.js';
import { M as Modal } from './Modal-3f99c0f7.js';
import { w as writable } from './index2-1f09def0.js';
import './fa-aaeaa1a9.js';
import './_commonjsHelpers-7d1333e8.js';
import './Wrapper-d29eca5d.js';
import './ToolbarButton-20ae584c.js';

const TabItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["open", "title", "activeClasses", "inactiveClasses", "defaultClass"]);
  let { open = false } = $$props;
  let { title = "Tab title" } = $$props;
  let { activeClasses = void 0 } = $$props;
  let { inactiveClasses = void 0 } = $$props;
  let { defaultClass = "inline-block text-sm font-medium text-center disabled:cursor-not-allowed" } = $$props;
  const ctx = getContext("ctx") ?? {};
  ctx.selected ?? writable();
  let buttonClass;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.activeClasses === void 0 && $$bindings.activeClasses && activeClasses !== void 0)
    $$bindings.activeClasses(activeClasses);
  if ($$props.inactiveClasses === void 0 && $$bindings.inactiveClasses && inactiveClasses !== void 0)
    $$bindings.inactiveClasses(inactiveClasses);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  buttonClass = classNames(
    defaultClass,
    open ? activeClasses ?? ctx.activeClasses : inactiveClasses ?? ctx.inactiveClasses,
    open && "active"
  );
  return `<li${add_attribute("class", classNames("group", $$props.class), 0)} role="presentation"><button${spread(
    [
      { type: "button" },
      { role: "tab" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      }
    ],
    {}
  )}>${slots.title ? slots.title({}) : `${escape(title)}`}</button>

  ${open ? `<div class="hidden tab_content_placeholder"><div>${slots.default ? slots.default({}) : ``}</div></div>` : ``}</li>`;
});
const styledActiveClasses = {
  full: "p-4 w-full group-first:rounded-l-lg group-last:rounded-r-lg text-gray-900 bg-gray-100 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-gray-700 dark:text-white",
  pill: "py-3 px-4 text-white bg-blue-600 rounded-lg",
  underline: "p-4 text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500",
  none: ""
};
const styledInactiveClasses = {
  full: "p-4 w-full group-first:rounded-l-lg group-last:rounded-r-lg text-gray-500 dark:text-gray-400 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700",
  pill: "py-3 px-4 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
  underline: "p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 text-gray-500 dark:text-gray-400",
  none: ""
};
const Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ulClass;
  let { style = "none" } = $$props;
  let { defaultClass = "flex flex-wrap space-x-2" } = $$props;
  let { contentClass = "p-4 bg-gray-50 rounded-lg dark:bg-gray-800 mt-4" } = $$props;
  let { divider = true } = $$props;
  let { activeClasses = "p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500" } = $$props;
  let { inactiveClasses = "p-4 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300" } = $$props;
  const ctx = {
    activeClasses: styledActiveClasses[style] || activeClasses,
    inactiveClasses: styledInactiveClasses[style] || inactiveClasses,
    selected: writable()
  };
  setContext("ctx", ctx);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.contentClass === void 0 && $$bindings.contentClass && contentClass !== void 0)
    $$bindings.contentClass(contentClass);
  if ($$props.divider === void 0 && $$bindings.divider && divider !== void 0)
    $$bindings.divider(divider);
  if ($$props.activeClasses === void 0 && $$bindings.activeClasses && activeClasses !== void 0)
    $$bindings.activeClasses(activeClasses);
  if ($$props.inactiveClasses === void 0 && $$bindings.inactiveClasses && inactiveClasses !== void 0)
    $$bindings.inactiveClasses(inactiveClasses);
  divider = ["full", "pill"].includes(style) ? false : divider;
  ulClass = classNames(defaultClass, style === "underline" && "-mb-px", $$props.class);
  return `<ul${add_attribute("class", ulClass, 0)}>${slots.default ? slots.default({ style }) : ``}</ul>
${divider ? `${slots.divider ? slots.divider({ style }) : `
    <div class="h-px bg-gray-200 dark:bg-gray-700"></div>
  `}` : ``}
<div${add_attribute("class", contentClass, 0)} role="tabpanel" aria-labelledby="id-tab"></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const user = data.user;
  const posts = data.posts;
  let open = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-n6swnj_START -->${$$result.title = `<title>User dashboard</title>`, ""}<!-- HEAD_svelte-n6swnj_END -->`, ""}

${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        title: "Are you sure?",
        autoclose: true,
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<form method="post">${validate_component(Button, "Button").$$render($$result, { type: "submit", color: "red" }, {}, {
            default: () => {
              return `Delete`;
            }
          })}
			${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `Cancel`;
            }
          })}</form>
	`;
        },
        default: () => {
          return `<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">You are about to delete your account. This action is irreversible. If you are sure, click the
		Delete button below. Otherwise, click the Cancel button.
	</p>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">When you delete your account, all your posts will be deleted as well.
	</p>`;
        }
      }
    )}

${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(TabItem, "TabItem").$$render($$result, { open: true, title: "Profile" }, {}, {
          default: () => {
            return `${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
              default: () => {
                return `<span>Username</span>
			${validate_component(Input, "Input").$$render($$result, { value: user.username, disabled: true }, {}, {})}`;
              }
            })}

		${validate_component(Label, "Label").$$render($$result, { class: "space-y-2 mt-2" }, {}, {
              default: () => {
                return `<span>Email</span>
			<div class="flex">${validate_component(Input, "Input").$$render($$result, { value: user.email, disabled: true }, {}, {})}
				${validate_component(Button, "Button").$$render($$result, { class: "ml-2" }, {}, {
                  default: () => {
                    return `Change`;
                  }
                })}</div>`;
              }
            })}

		${validate_component(Label, "Label").$$render($$result, { class: "space-y-2 mt-2" }, {}, {
              default: () => {
                return `<span>Joined at</span>
			${validate_component(Input, "Input").$$render(
                  $$result,
                  {
                    value: getDate(user.created) ?? "",
                    disabled: true
                  },
                  {},
                  {}
                )}`;
              }
            })}

		<div class="mt-4">${validate_component(Button, "Button").$$render($$result, { href: "/password-reset" }, {}, {
              default: () => {
                return `Reset password`;
              }
            })}
			${validate_component(Button, "Button").$$render($$result, { color: "red" }, {}, {
              default: () => {
                return `Delete account`;
              }
            })}</div>

		<form method="post" class="mt-3"></form>`;
          }
        })}
	${validate_component(TabItem, "TabItem").$$render($$result, { title: "Posts" }, {}, {
          default: () => {
            return `${validate_component(Posts, "Posts").$$render($$result, { posts, author: user.username }, {}, {})}`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-bec1e8c0.js.map
