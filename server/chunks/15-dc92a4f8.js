import { v as validation } from './email-e62761e8.js';
import './index-f38045c6.js';

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
const component = async () => (await import('./_page.svelte-214a60fb.js')).default;
const file = '_app/immutable/entry/verification-page.svelte.2de2106e.js';
const server_id = "src/routes/verification/+page.server.ts";
const imports = ["_app/immutable/entry/verification-page.svelte.2de2106e.js","_app/immutable/chunks/index.139172c0.js","_app/immutable/chunks/notification.b454eabb.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.fbd5f539.js","_app/immutable/chunks/Label.fbb2c53b.js","_app/immutable/chunks/Input.b3e37cdb.js","_app/immutable/chunks/Wrapper.48eecd67.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/toast.d71cff8f.js","_app/immutable/chunks/index.e8b7944c.js"];
const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=15-dc92a4f8.js.map
