import { b as private_env } from './shared-server-b7e48788.js';
import { p as parseDateFromInput, s as serializeNonPOJOs, c as convertMessagesFromPocketBase } from './helpers-ba8b6484.js';
import { v as validation } from './post-813c40ca.js';
import { r as redirect } from './index-1dce6fb5.js';
import './index-47be0ba9.js';

const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    formData.set(
      "slug",
      formData.get("title")?.toString().toLowerCase().replace(/ /g, "-")
    );
    formData.set("postedAt", parseDateFromInput(formData.get("postedAt")));
    const user = serializeNonPOJOs(locals.pocketBase.authStore.model);
    if (!user.id)
      throw redirect(303, "/login");
    formData.set("author", user.id);
    const data = Object.fromEntries([...formData]);
    console.log(data);
    const errorObject = {
      error: true,
      notification: "An error occurred while creating the post. Please try again.",
      title: data.title,
      description: data.description,
      content: data.unformattedContent,
      postedAt: data.postedAt
    };
    const result = validation.safeParse(data);
    console.log(result);
    console.log(private_env.NODE_ENV);
    if (!result.success) {
      return {
        ...errorObject,
        messages: result.error.flatten().fieldErrors
      };
    }
    try {
      const posts = locals.pocketBase.collection("posts");
      await posts.create(data);
    } catch (err) {
      console.log(err);
      return {
        ...errorObject,
        messages: convertMessagesFromPocketBase(err)
      };
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 3;
const component = async () => (await import('./_page.svelte-a4337051.js')).default;
const file = '_app/immutable/entry/article-add-page.svelte.40d4404f.js';
const server_id = "src/routes/article/add/+page.server.ts";
const imports = ["_app/immutable/entry/article-add-page.svelte.40d4404f.js","_app/immutable/chunks/index.2655b24c.js","_app/immutable/chunks/notification.dcfa683d.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.c401fae7.js","_app/immutable/chunks/Label.53912022.js","_app/immutable/chunks/Input.ebb301ae.js","_app/immutable/chunks/Wrapper.0f99e45f.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/toast.54ef7492.js","_app/immutable/chunks/index.393cae65.js"];
const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-9fa1ea91.js.map
