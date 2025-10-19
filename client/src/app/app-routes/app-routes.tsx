import { LoginLayout } from '@pages/login';
import { MainLayout } from '@pages/main';
import { RequestsLayout } from '@pages/requests';
import { ROUTE_PATH } from '@shared/config/router/routes';
import { Navigate, Route, Routes } from 'react-router-dom';

export function AppRoutes() {
	return (
		<Routes>
			<Route element={<MainLayout />} path={ROUTE_PATH.MAIN} />
			<Route element={<LoginLayout />} path={ROUTE_PATH.LOGIN} />
			<Route element={<RequestsLayout />} path={ROUTE_PATH.REQUESTS} />
			<Route element={<Navigate to={ROUTE_PATH.MAIN} />} path='*' />
		</Routes>
	);
}
