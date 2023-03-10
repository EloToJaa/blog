import { s as sanitizeContent, f as formatContent, v as validation } from './post-b8874892.js';
import { p as parseDateFromInput, s as serializeNonPOJOs, c as convertMessagesFromPocketBase } from './helpers-ba8b6484.js';
import { r as redirect } from './index-1dce6fb5.js';
import './_commonjsHelpers-7d1333e8.js';
import 'tty';
import 'path';
import 'url';
import 'fs';
import './index-f38045c6.js';

const actions = {
  create: async ({ request, locals }) => {
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
    formData.set("unformattedContent", sanitizeContent(formData.get("content")));
    formData.set("content", formatContent(formData.get("content")));
    const data = Object.fromEntries([...formData]);
    const errorObject = {
      error: true,
      notification: "An error occurred while creating the post. Please try again.",
      title: data.title,
      description: data.description,
      content: data.unformattedContent,
      postedAt: data.postedAt
    };
    const result = validation.safeParse(data);
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
    throw redirect(303, `/blog/${data.slug}`);
  },
  preview: async ({ request }) => {
    const formData = await request.formData();
    formData.set("postedAt", parseDateFromInput(formData.get("postedAt")));
    formData.set("unformattedContent", sanitizeContent(formData.get("content")));
    formData.set("content", formatContent(formData.get("content")));
    const data = Object.fromEntries([...formData]);
    const errorObject = {
      error: true,
      notification: "An error occurred while creating the post. Please try again.",
      title: data.title,
      content: data.unformattedContent,
      postedAt: data.postedAt
    };
    const result = validation.safeParse(data);
    if (!result.success) {
      return {
        ...errorObject,
        messages: result.error.flatten().fieldErrors
      };
    }
    return {
      preview: true,
      title: data.title,
      description: data.description,
      content: data.unformattedContent,
      formattedContent: data.content,
      postedAt: data.postedAt
    };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 3;
const component = async () => (await import('./_page.svelte-6ac2e85f.js')).default;
const file = '_app/immutable/entry/article-add-page.svelte.96b3c6e0.js';
const server_id = "src/routes/article/add/+page.server.ts";
const imports = ["_app/immutable/entry/article-add-page.svelte.96b3c6e0.js","_app/immutable/chunks/index.139172c0.js","_app/immutable/chunks/notification.b454eabb.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.fbd5f539.js","_app/immutable/chunks/Label.fbb2c53b.js","_app/immutable/chunks/Input.b3e37cdb.js","_app/immutable/chunks/Wrapper.48eecd67.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/toast.d71cff8f.js","_app/immutable/chunks/index.e8b7944c.js","_app/immutable/chunks/Modal.95f0b468.js","_app/immutable/chunks/ToolbarButton.303651e4.js"];
const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-ac0b4077.js.map
