import { Stack } from '@mui/material';

import { MainForm } from '../main-form/main-form';

export const MainLayout = () => {
	return (
		<Stack
			alignItems='center'
			flex='1'
			height='100%'
			justifyContent='center'
		>
			<MainForm />
		</Stack>
	);
};
