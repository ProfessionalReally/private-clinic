import * as z from 'zod';

export const PASSWORD_REGEX = {
	lowerCase: /[a-z]/,
	number: /\d/,
	specialChar: /[#?!@$%^&*-]/,
	upperCase: /[A-Z]/,
};

export const MIN_PASSWORD = 6;
export const MAX_PASSWORD = 32;

export const loginValidationSchema = z.object({
	email: z.email('Invalid email format.').nonempty('Email is required!'),

	password: z
		.string()
		.nonempty('Password is required!')
		.min(MIN_PASSWORD, {
			message: `Password must be at least ${MIN_PASSWORD} characters.`,
		})
		.max(MAX_PASSWORD, {
			message: `Password must be no more than ${MAX_PASSWORD} characters.`,
		})
		.regex(PASSWORD_REGEX.lowerCase, {
			message: 'Password must include at least one LOWERCASE letter',
		})
		.regex(PASSWORD_REGEX.upperCase, {
			message: 'Password must include at least one UPPERCASE letter.',
		})
		.regex(PASSWORD_REGEX.number, {
			message: 'Password must include at least one number.',
		})
		.regex(PASSWORD_REGEX.specialChar, {
			message:
				'Password must include at least special character(#?!@$%^&*-)',
		}),
});

export type LoginFormValues = z.infer<typeof loginValidationSchema>;
