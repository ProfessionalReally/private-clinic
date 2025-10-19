import { Stack } from '@mui/material';

import { LoginForm } from '../login-form/login-form';

export const LoginLayout = () => {
	return (
		<Stack alignItems='center' height='100%' justifyContent='center'>
			<LoginForm />
		</Stack>
	);
};
