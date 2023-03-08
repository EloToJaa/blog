import { v as validation } from './email-9880eebc.js';
import './index-47be0ba9.js';

const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const data = Object.fromEntries([...formData]);
    const errorObject = {
      error: true,
      notification: "An error occurred while sending email. Please try again.",
      email: data.email
    };
    const result = validation.safeParse(data);
    if (!result.success) {
      return {
        ...errorObject,
        messages: result.error.flatten().fieldErrors
      };
    }
    try {
      const users = locals.pocketBase.collection("users");
      await users.requestVerification(data.email);
    } catch (err) {
      return errorObject;
    }
    return {
      error: false,
      notification: "Verification email sent.",
      email: data.email
    };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 15;
const component = async () => (await import('./_page.svelte-efca878f.js')).default;
const file = '_app/immutable/entry/verification-page.svelte.35a9cd63.js';
const server_id = "src/routes/verification/+page.server.ts";
const imports = ["_app/immutable/entry/verification-page.svelte.35a9cd63.js","_app/immutable/chunks/index.2655b24c.js","_app/immutable/chunks/notification.dcfa683d.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.c401fae7.js","_app/immutable/chunks/Label.53912022.js","_app/immutable/chunks/Input.ebb301ae.js","_app/immutable/chunks/Wrapper.0f99e45f.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/toast.54ef7492.js","_app/immutable/chunks/index.393cae65.js"];
const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=15-3eea30c9.js.map
