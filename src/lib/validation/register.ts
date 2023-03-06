import { z } from 'zod';

const validation = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(3, { message: 'Username must be at least 3 characters long' })
		.max(20, { message: 'Username must be at most 20 characters long' })
		.trim(),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, { message: 'Password must be at least 8 characters long' })
		.max(64, 'Password must be at most 64 characters long')
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/, {
			message:
				'Password must contain at least one uppercase letter, one lowercase letter and one number and one special character'
		})
		.trim(),
	passwordConfirm: z
		.string({ required_error: 'Password is required' })
		.min(8, { message: 'Password must be at least 8 characters long' })
		.max(64, 'Password must be at most 64 characters long')
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/, {
			message:
				'Password must contain at least one uppercase letter, one lowercase letter and one number and one special character'
		})
		.trim(),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email address' })
});

export default validation;
