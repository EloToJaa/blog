import { c as create_ssr_component, b as subscribe, v as validate_component, g as compute_rest_props, d as add_attribute, p as compute_slots } from './index3-4f698b40.js';
import { s as searchStore, P as Posts } from './Posts-25045f6d.js';
import './Indicator.svelte_svelte_type_style_lang-bbc32287.js';
import { W as Wrapper } from './Wrapper-73f6292b.js';
import { I as Input } from './Input-1a3ac9f8.js';
import './getDate-8c6d4f59.js';
import './fa-65609c29.js';
import './index2-5a9cf22e.js';
import './_commonjsHelpers-849bcf65.js';

const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "placeholder", "value"]);
  let $$slots = compute_slots(slots);
  let { size = "lg" } = $$props;
  let { placeholder = "Search" } = $$props;
  let { value = "" } = $$props;
  const sizes = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Wrapper, "Wrapper").$$render(
      $$result,
      {
        class: "relative w-full",
        show: $$slots.default
      },
      {},
      {
        default: () => {
          return `${validate_component(Input, "Input").$$render(
            $$result,
            Object.assign({}, { type: "search" }, { placeholder }, { size }, $$restProps, { class: $$props.class }, { value }),
            {
              value: ($$value) => {
                value = $$value;
                $$settled = false;
              }
            },
            {
              left: () => {
                return `<svg slot="${"left"}"${add_attribute("class", sizes[size], 0)} fill="${"currentColor"}" viewBox="${"0 0 20 20"}" xmlns="${"http://www.w3.org/2000/svg"}"><path fill-rule="${"evenodd"}" d="${"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"}" clip-rule="${"evenodd"}"></path></svg>`;
              }
            }
          )}
  
  ${$$slots.default ? `<div class="${"flex absolute inset-y-0 right-0 items-center pr-3 text-gray-500 dark:text-gray-400"}">${slots.default ? slots.default({}) : ``}</div>` : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $searchStore, $$unsubscribe_searchStore;
  $$unsubscribe_searchStore = subscribe(searchStore, (value) => $searchStore = value);
  let { data } = $$props;
  let size = "md";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    size = "md";
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1c8tpdw_START -->${$$result.title = `<title>Search</title>`, ""}<!-- HEAD_svelte-1c8tpdw_END -->`, ""}


${validate_component(Search, "Search").$$render(
      $$result,
      { size, value: $searchStore.search },
      {
        value: ($$value) => {
          $searchStore.search = $$value;
          $$settled = false;
        }
      },
      {}
    )}
${validate_component(Posts, "Posts").$$render($$result, { posts: data.posts }, {}, {})}`;
  } while (!$$settled);
  $$unsubscribe_searchStore();
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-a6f5c804.js.map
