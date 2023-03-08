import { r as redirect } from './index-1dce6fb5.js';

const POST = async ({ locals }) => {
  locals.pocketBase.authStore.clear();
  throw redirect(303, "/");
};

export { POST };
//# sourceMappingURL=_server.ts-3aea731d.js.map
