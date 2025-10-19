import { Stack } from '@mui/material';

import { RequestsTable } from '../requests-table';

export const RequestsLayout = () => {
	return (
		<Stack alignItems='center' height='100%' justifyContent='center'>
			<RequestsTable />
		</Stack>
	);
};
