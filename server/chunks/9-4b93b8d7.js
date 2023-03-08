import { z } from './index-47be0ba9.js';
import { r as redirect } from './index-1dce6fb5.js';

const validation = z.object({
  usernameOrEmail: z.string({ required_error: "Username or email is required" }).min(3, {
    message: "Username or email must be at least 3 characters long"
  }).max(50, {
    message: "Username or email must be at most 50 characters long"
  }).trim(),
  password: z.string({ required_error: "Password is required" }).min(1, { message: "Password is required" }).max(64, { message: "Password is too long" }).trim()
});
const load = ({ locals }) => {
  if (locals.pocketBase.authStore.isValid) {
    throw redirect(303, "/");
  }
};
const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const data = Object.fromEntries([...formData]);
    const errorObject = {
      error: true,
      notification: "An error occurred while logging in. Please try again.",
      usernameOrEmail: data.usernameOrEmail
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
      await users.authWithPassword(data.usernameOrEmail, data.password);
    } catch (err) {
      return {
        ...errorObject,
        messages: {
          usernameOrEmail: ["Invalid username or password"],
          password: ["Invalid username or password"]
        }
      };
    }
    const user = locals.pocketBase.authStore;
    if (user.model && !user.model.verified) {
      user.clear();
      return {
        error: true,
        notification: "Your account has not been verified. Please check your email for a verification link."
      };
    }
    throw redirect(303, "/");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 9;
const component = async () => (await import('./_page.svelte-624b27b9.js')).default;
const file = '_app/immutable/entry/login-page.svelte.c50717be.js';
const server_id = "src/routes/login/+page.server.ts";
const imports = ["_app/immutable/entry/login-page.svelte.c50717be.js","_app/immutable/chunks/index.2655b24c.js","_app/immutable/chunks/notification.dcfa683d.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.c401fae7.js","_app/immutable/chunks/Label.53912022.js","_app/immutable/chunks/Input.ebb301ae.js","_app/immutable/chunks/Wrapper.0f99e45f.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/toast.54ef7492.js","_app/immutable/chunks/index.393cae65.js"];
const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-4b93b8d7.js.map
