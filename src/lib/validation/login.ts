import { z } from 'zod';

const validation = z.object({
	usernameOrEmail: z
		.string({ required_error: 'Username or email is required' })
		.min(3, {
			message: 'Username or email must be at least 3 characters long'
		})
		.max(50, {
			message: 'Username or email must be at most 50 characters long'
		})
		.trim(),
	password: z
		.string({ required_error: 'Password is required' })
		.min(1, { message: 'Password is required' })
		.max(64, { message: 'Password is too long' })
		.trim()
});

export default validation;
