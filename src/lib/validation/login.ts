import { z } from 'zod';

const validation = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(3, {
			message: 'Username must be at least 3 characters long'
		})
		.max(20, {
			message: 'Username must be at most 20 characters long'
		})
		.trim(),
	password: z
		.string({ required_error: 'Password is required' })
		.min(1, { message: 'Password is required' })
		.max(64, { message: 'Password is too long' })
		.trim()
});

export default validation;
