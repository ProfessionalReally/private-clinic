import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, styled, TextField, Typography } from '@mui/material';
import {
	type MainFormValues,
	mainValidationSchema,
} from '@pages/main/model/main-validation-schema';
import { PhoneMaskInput } from '@shared/ui/phone-input-mask';
import { Controller, useForm } from 'react-hook-form';

const StyledStack = styled(Stack)(({ theme }) => ({
	background: theme.palette.grey[100],
	borderRadius: theme.spacing(2),
	boxShadow: theme.shadows[5],
	flexDirection: 'column',
	gap: theme.spacing(2),
	maxWidth: '400px',
	padding: theme.spacing(2),
	width: '100%',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
	background: theme.palette.common.white,
}));

const initialValues: MainFormValues = {
	fullName: '',
	phone: '',
	problemDescription: '',
};

export const MainForm = () => {
	const {
		control,
		formState: { errors, isSubmitting },
		handleSubmit,
		register,
	} = useForm<MainFormValues>({
		defaultValues: initialValues,
		mode: 'onBlur',
		resolver: zodResolver(mainValidationSchema),
	});

	return (
		<StyledStack>
			<Typography component='h2' textAlign='center' variant='h4'>
				Doctor's appointment
			</Typography>
			<form
				onSubmit={handleSubmit((data) => console.log(data))}
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '20px',
					width: '100%',
				}}
			>
				<StyledTextField
					label='Full name'
					placeholder='Enter your full name'
					{...register('fullName')}
					error={!!errors.fullName}
					fullWidth
					helperText={errors.fullName?.message}
					required
				/>

				<Controller
					control={control}
					name='phone'
					render={({ field }) => (
						<StyledTextField
							{...field}
							error={!!errors.phone}
							fullWidth
							helperText={errors.phone?.message}
							label='Phone number'
							placeholder='Enter your phone number'
							required
							slotProps={{
								input: {
									inputComponent: PhoneMaskInput,
								},
							}}
						/>
					)}
				/>

				<StyledTextField
					label='Problem description'
					multiline
					rows={4}
					{...register('problemDescription')}
					error={!!errors.problemDescription}
					fullWidth
					helperText={errors.problemDescription?.message}
					required
				/>

				<Button
					loading={isSubmitting}
					type='submit'
					variant='contained'
				>
					Submit
				</Button>
			</form>
		</StyledStack>
	);
};
