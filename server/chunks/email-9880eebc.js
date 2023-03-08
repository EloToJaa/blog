import { z } from './index-47be0ba9.js';

const validation = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Email must be a valid email address" })
});

export { validation as v };
//# sourceMappingURL=email-9880eebc.js.map
