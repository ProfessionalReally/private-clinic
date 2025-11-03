import { type NewRequest, useAddRequest } from '@entities/request';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Alert,
	Button,
	Snackbar,
	Stack,
	styled,
	TextField,
	Typography,
} from '@mui/material';
import { mainValidationSchema } from '@pages/main/model/main-validation-schema';
import { PhoneMaskInput } from '@shared/ui/phone-input-mask';
import { useState } from 'react';
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

const initialValues: NewRequest = {
	fullName: '',
	phone: '',
	problemDescription: '',
};

type SnackbarState = {
	message: string;
	open: boolean;
	severity: 'error' | 'success';
};

export const MainForm = () => {
	const [snackbar, setSnackbar] = useState<SnackbarState>({
		message: '',
		open: false,
		severity: 'success',
	});

	const {
		control,
		formState: { errors, isSubmitting },
		handleSubmit,
		register,
		reset,
	} = useForm<NewRequest>({
		defaultValues: initialValues,
		mode: 'onBlur',
		resolver: zodResolver(mainValidationSchema),
	});

	const addRequest = useAddRequest();

	const handleCloseSnackbar = () => {
		setSnackbar((prev: SnackbarState) => ({ ...prev, open: false }));
	};

	const onSubmit = async (data: NewRequest) => {
		try {
			await addRequest.mutateAsync(data, {
				onSuccess: () => {
					reset();
					setSnackbar({
						message: 'Request successfully created',
						open: true,
						severity: 'success',
					});
				},
			});
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				error?.message ||
				'Something went wrong';

			setSnackbar({
				message,
				open: true,
				severity: 'error',
			});
		}
	};

	return (
		<StyledStack>
			<Typography component='h2' textAlign='center' variant='h4'>
				Doctor's appointment
			</Typography>
			<form
				onSubmit={handleSubmit(onSubmit)}
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

			<Snackbar
				anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
				autoHideDuration={4000}
				onClose={handleCloseSnackbar}
				open={snackbar.open}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					sx={{ width: '100%' }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</StyledStack>
	);
};
