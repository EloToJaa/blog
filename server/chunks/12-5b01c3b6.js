import { c as convertMessagesFromPocketBase } from './helpers-ba8b6484.js';
import { z } from './index-47be0ba9.js';
import { r as redirect } from './index-1dce6fb5.js';

const validation = z.object({
  username: z.string({ required_error: "Username is required" }).min(3, { message: "Username must be at least 3 characters long" }).max(20, { message: "Username must be at most 20 characters long" }).trim(),
  password: z.string({ required_error: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" }).max(64, "Password must be at most 64 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter and one number and one special character"
  }).trim(),
  passwordConfirm: z.string({ required_error: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" }).max(64, "Password must be at most 64 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter and one number and one special character"
  }).trim(),
  email: z.string({ required_error: "Email is required" }).email({ message: "Email must be a valid email address" })
});
const load = ({ locals }) => {
  if (locals.pocketBase.authStore.isValid) {
    throw redirect(303, "/");
  }
};
const actions = {
  default: async ({ locals, request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries([...formData]);
    const errorObject = {
      error: true,
      notification: "An error occurred while creating your account. Please try again.",
      email: data.email,
      username: data.username
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
      await users.create(data);
      await users.requestVerification(data.email);
      return {
        notification: "Your account has been created. Please check your email to verify your account.",
        error: false
      };
    } catch (err) {
      return {
        ...errorObject,
        messages: convertMessagesFromPocketBase(err)
      };
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 12;
const component = async () => (await import('./_page.svelte-033e0d70.js')).default;
const file = '_app/immutable/entry/register-page.svelte.e3b0aad0.js';
const server_id = "src/routes/register/+page.server.ts";
const imports = ["_app/immutable/entry/register-page.svelte.e3b0aad0.js","_app/immutable/chunks/index.2655b24c.js","_app/immutable/chunks/notification.dcfa683d.js","_app/immutable/chunks/Indicator.svelte_svelte_type_style_lang.c401fae7.js","_app/immutable/chunks/Label.53912022.js","_app/immutable/chunks/Input.ebb301ae.js","_app/immutable/chunks/Wrapper.0f99e45f.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/toast.54ef7492.js","_app/immutable/chunks/index.393cae65.js"];
const stylesheets = ["_app/immutable/assets/Indicator.1d121e74.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-5b01c3b6.js.map
