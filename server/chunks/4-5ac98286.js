import { f as formatContent, s as sanitizeContent, v as validation } from './post-b8874892.js';
import { p as parseDateFromInput, s as serializeNonPOJOs, a as convertMessagesFromPocketBase } from './helpers-b426d147.js';
import { e as error, r as redirect } from './index-1dce6fb5.js';
import './_commonjsHelpers-7d1333e8.js';
import 'tty';
import 'path';
import 'url';
import 'fs';
import './index-f38045c6.js';

const load = async ({ locals, params }) => {
  try {
    const posts = locals.pocketBase.collection("posts");
    const post = await posts.getFirstListItem(`slug="${params.slug}"`);
    return {
      postedAt: post.postedAt,
      title: post.title,
      content: post.unformattedContent,
      description: post.description
    };
  } catch (err) {
    console.log(err);
    throw error(404, "Post not found");
  }
};
const actions = {
  update: async ({ request, locals, params }) => {
    const slug = params.slug;
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
    formData.set("content", formatContent(formData.get("content")));
    formData.set("unformattedContent", sanitizeContent(formData.get("content")));
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
      const post = await posts.getFirstListItem(`slug="${slug}"`);
      await posts.update(post.id, data);
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
  actions: actions,
  load: load
});

const index = 4;
const component = async () => (await import('./_page.svelte-c6133d6f.js')).default;
const file = '_app/immutable/entry/article-edit-_slug_-page.svelte.26052611.js';
const server_id = "src/routes/article/edit/[slug]/+page.server.ts";
const imports = ["_app/immutable/entry/article-edit-_slug_-page.svelte.26052611.js","_app/immutable/chunks/index.139172c0.js","_app/immutable/chunks/notification.b454eabb.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.fbd5f539.js","_app/immutable/chunks/Label.fbb2c53b.js","_app/immutable/chunks/Input.b3e37cdb.js","_app/immutable/chunks/Wrapper.48eecd67.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/toast.d71cff8f.js","_app/immutable/chunks/index.e8b7944c.js","_app/immutable/chunks/Modal.95f0b468.js","_app/immutable/chunks/ToolbarButton.303651e4.js"];
const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-5ac98286.js.map
