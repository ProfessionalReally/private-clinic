import { useCurrentUser, useLogout } from '@entities/user';
import { Button, Stack, styled, Typography } from '@mui/material';
import { ROUTE_PATH } from '@shared/config/router/routes';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const StyledBlock = styled('header')(({ theme }) => ({
	alignItems: 'center',
	background: theme.palette.grey[100],
	display: 'flex',
	height: '100px',
	justifyContent: 'space-between',
	padding: theme.spacing(2),
	width: '100%',
}));

const StyledLink = styled(Link)(({ theme }) => ({
	color: theme.palette.text.primary,
	textDecoration: 'none',
}));

export const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const isPrivatePage = location.pathname.startsWith('/requests');

	const currentUser = useCurrentUser({
		enabled: isPrivatePage,
	});
	const logout = useLogout();

	const handleLogout = async () => {
		await logout.mutateAsync();
		navigate(ROUTE_PATH.LOGIN);
	};

	return (
		<StyledBlock>
			<StyledLink to={ROUTE_PATH.MAIN}>
				<Typography component='h1' fontWeight='bold' variant='h4'>
					Private Clinic
				</Typography>
			</StyledLink>
			<Stack alignItems='center' direction='row' gap={2}>
				{currentUser.data && (
					<Typography component='h2' fontWeight='bold' variant='h6'>
						{currentUser.data.email}
					</Typography>
				)}
				<Button
					onClick={
						currentUser.data
							? handleLogout
							: () => navigate(ROUTE_PATH.LOGIN)
					}
					variant='contained'
				>
					{currentUser.data ? 'Logout' : 'Login'}
				</Button>
			</Stack>
		</StyledBlock>
	);
};
