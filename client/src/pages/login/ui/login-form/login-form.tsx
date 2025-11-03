import type { User } from '@entities/user';

import { zodResolver } from '@hookform/resolvers/zod';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
	Alert,
	Button,
	IconButton,
	InputAdornment,
	Snackbar,
	Stack,
	styled,
	TextField,
	Typography,
} from '@mui/material';
import { useLogin } from '@pages/login/api/auth/login-mutation';
import { loginValidationSchema } from '@pages/login/model/login-validation-schema';
import { ROUTE_PATH } from '@shared/config/router/routes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type SnackbarState = {
	message: string;
	open: boolean;
};

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

const initialValues: User = {
	email: '',
	password: '',
};

export const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [snackbar, setSnackbar] = useState<SnackbarState>({
		message: '',
		open: false,
	});

	const login = useLogin();
	const navigate = useNavigate();

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleCloseSnackbar = () => {
		setSnackbar({ message: '', open: false });
	};

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	const {
		formState: { errors, isSubmitting },
		handleSubmit,
		register,
	} = useForm<User>({
		defaultValues: initialValues,
		mode: 'onBlur',
		resolver: zodResolver(loginValidationSchema),
	});

	const onSubmit = async (data: User) => {
		try {
			await login.mutateAsync(data, {
				onSuccess: () => {
					navigate(ROUTE_PATH.REQUESTS);
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
			});
		}
	};

	return (
		<StyledStack>
			<Typography component='h2' textAlign='center' variant='h4'>
				Login
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
					label='Email'
					placeholder='Enter your email'
					type='email'
					{...register('email')}
					error={!!errors.email}
					fullWidth
					helperText={errors.email?.message}
					required
				/>
				<StyledTextField
					label='Password'
					placeholder='Enter your password'
					type={showPassword ? 'text' : 'password'}
					{...register('password')}
					error={!!errors.password}
					fullWidth
					helperText={errors.password?.message}
					required
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label={
											showPassword
												? 'hide the password'
												: 'display the password'
										}
										edge='end'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										onMouseUp={handleMouseUpPassword}
									>
										{showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							),
						},
					}}
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
				autoHideDuration={4000}
				onClose={handleCloseSnackbar}
				open={snackbar.open}
			>
				<Alert onClose={handleCloseSnackbar} severity='error'>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</StyledStack>
	);
};
