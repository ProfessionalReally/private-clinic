import { Stack } from '@mui/material';

import { LoginForm } from '../login-form/login-form';

export const LoginLayout = () => {
	return (
		<Stack
			alignItems='center'
			flex='1'
			height='100%'
			justifyContent='center'
		>
			<LoginForm />
		</Stack>
	);
};
