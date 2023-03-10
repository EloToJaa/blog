import { c as convertMessagesFromPocketBase } from './helpers-ba8b6484.js';
import { z } from './index-f38045c6.js';

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
const component = async () => (await import('./_page.svelte-506fd4e3.js')).default;
const file = '_app/immutable/entry/auth-confirm-password-reset-_token_-page.svelte.cc4732bd.js';
const server_id = "src/routes/auth/confirm/password-reset/[token]/+page.server.ts";
const imports = ["_app/immutable/entry/auth-confirm-password-reset-_token_-page.svelte.cc4732bd.js","_app/immutable/chunks/index.139172c0.js","_app/immutable/chunks/notification.b454eabb.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.fbd5f539.js","_app/immutable/chunks/Label.fbb2c53b.js","_app/immutable/chunks/Input.b3e37cdb.js","_app/immutable/chunks/Wrapper.48eecd67.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/toast.d71cff8f.js","_app/immutable/chunks/index.e8b7944c.js"];
const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-0593434e.js.map
