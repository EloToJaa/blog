import { f as formatContent, s as sanitizeContent, v as validation } from './post-6bd8fac6.js';
import { p as parseDateFromInput, s as serializeNonPOJOs, c as convertMessagesFromPocketBase } from './helpers-ba8b6484.js';
import { e as error, r as redirect } from './index-1dce6fb5.js';
import './_commonjsHelpers-849bcf65.js';
import 'path';
import 'fs';
import 'vm';
import 'punycode';
import 'buffer';
import 'string_decoder';
import 'events';
import 'util';
import 'perf_hooks';
import 'canvas';
import 'os';
import 'crypto';
import 'http';
import 'child_process';
import 'https';
import 'url';
import 'net';
import 'tls';
import 'tty';
import 'assert';
import 'stream';
import 'zlib';
import './index-47be0ba9.js';

const ssr = false;
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
  default: async ({ request, locals, params }) => {
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
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load,
  ssr: ssr
});

const index = 4;
const component = async () => (await import('./_page.svelte-1b66e3b9.js')).default;
const file = '_app/immutable/entry/article-edit-_slug_-page.svelte.6032c6fe.js';
const server_id = "src/routes/article/edit/[slug]/+page.server.ts";
const imports = ["_app/immutable/entry/article-edit-_slug_-page.svelte.6032c6fe.js","_app/immutable/chunks/index.2655b24c.js","_app/immutable/chunks/notification.dcfa683d.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.c401fae7.js","_app/immutable/chunks/Label.53912022.js","_app/immutable/chunks/Input.ebb301ae.js","_app/immutable/chunks/Wrapper.0f99e45f.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/toast.54ef7492.js","_app/immutable/chunks/index.393cae65.js"];
const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-aa189ad3.js.map
