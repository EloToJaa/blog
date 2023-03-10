import { z } from './index-f38045c6.js';

const validation = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Email must be a valid email address" })
});

export { validation as v };
//# sourceMappingURL=email-e62761e8.js.map
