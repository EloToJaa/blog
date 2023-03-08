import { c as convertMessagesFromPocketBase } from './helpers-ba8b6484.js';
import { z } from './index-47be0ba9.js';

const validation = z.object({
  password: z.string({ required_error: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" }).max(64, "Password must be at most 64 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter and one number and one special character"
  }).trim(),
  passwordConfirm: z.string({ required_error: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" }).max(64, "Password must be at most 64 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter and one number and one special character"
  }).trim()
});
const actions = {
  default: async ({ locals, request, params }) => {
    const token = params.token;
    const formData = await request.formData();
    const data = Object.fromEntries([...formData]);
    const errorObject = {
      error: true,
      notification: "An error occurred while resetting password. Please try again."
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
      await users.confirmPasswordReset(
        token,
        data.password,
        data.passwordConfirm
      );
      return {
        notification: "Your password has been reset. You can now log in with your new password.",
        error: false
      };
    } catch (err) {
      return {
        error: true,
        notification: "Reset password token is invalid or has expired.",
        messages: convertMessagesFromPocketBase(err)
      };
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 5;
const component = async () => (await import('./_page.svelte-96509a41.js')).default;
const file = '_app/immutable/entry/auth-confirm-password-reset-_token_-page.svelte.77098448.js';
const server_id = "src/routes/auth/confirm/password-reset/[token]/+page.server.ts";
const imports = ["_app/immutable/entry/auth-confirm-password-reset-_token_-page.svelte.77098448.js","_app/immutable/chunks/index.2655b24c.js","_app/immutable/chunks/notification.dcfa683d.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.c401fae7.js","_app/immutable/chunks/Label.53912022.js","_app/immutable/chunks/Input.ebb301ae.js","_app/immutable/chunks/Wrapper.0f99e45f.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/toast.54ef7492.js","_app/immutable/chunks/index.393cae65.js"];
const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-54e86db6.js.map
