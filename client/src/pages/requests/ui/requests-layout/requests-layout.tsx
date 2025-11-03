import { Stack } from '@mui/material';

import { RequestsTable } from '../requests-table';

export const RequestsLayout = () => {
	return (
		<Stack
			alignItems='center'
			flex='1'
			height='100%'
			justifyContent='center'
		>
			<RequestsTable />
		</Stack>
	);
};
