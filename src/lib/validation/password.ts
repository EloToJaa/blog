import { z } from 'zod';

const validation = z.object({
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
		.trim()
});

export default validation;
