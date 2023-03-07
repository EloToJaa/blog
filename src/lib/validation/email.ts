import { z } from 'zod';

const validation = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email address' })
});

export default validation;
