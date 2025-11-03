import { Box, Container, styled } from '@mui/material';
import { Header } from '@widgets/header';

import { AppRoutes } from './app-routes/app-routes';

const StyledContainer = styled(Container)(({ theme }) => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	gap: '20px',
	padding: theme.spacing(2),
	paddingTop: 0,
}));

const StyledBox = styled(Box)(({ theme }) => ({
	background: theme.palette.background.default,
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100vh',
}));

export const PrivateClinic = () => {
	return (
		<StyledBox>
			<Header />
			<StyledContainer maxWidth='lg'>
				<AppRoutes />
			</StyledContainer>
		</StyledBox>
	);
};
