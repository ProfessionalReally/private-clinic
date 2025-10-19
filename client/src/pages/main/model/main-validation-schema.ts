import * as z from 'zod';

export const mainValidationSchema = z.object({
	fullName: z
		.string()
		.trim()
		.nonempty('Full name is required!')
		.min(3, 'Full name must be at least 3 characters long.')
		.max(100, 'Full name must be no more than 100 characters.'),
	phone: z
		.string()
		.nonempty('Phone number is required!')
		.transform((value) => value.replace(/\D/g, ''))
		.refine(
			(value) => {
				const digits = value.replace(/\D/g, '');
				return digits.length === 11;
			},
			{ message: 'Некорректный номер телефона' },
		),
	problemDescription: z
		.string()
		.trim()
		.nonempty('Problem description is required!'),
});

export type MainFormValues = z.infer<typeof mainValidationSchema>;
