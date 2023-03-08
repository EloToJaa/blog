import { r as redirect } from './index-1dce6fb5.js';

const POST = async ({ locals }) => {
  const userId = locals.pocketBase.authStore.model?.id;
  if (!userId)
    throw redirect(303, "/");
  const users = locals.pocketBase.collection("users");
  await users.delete(userId);
  locals.pocketBase.authStore.clear();
  throw redirect(303, "/");
};

export { POST };
//# sourceMappingURL=_server.ts-22424617.js.map
