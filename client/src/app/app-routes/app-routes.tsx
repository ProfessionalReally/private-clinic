import { ROUTE_PATH } from '@shared/config/router/routes';
import { Navigate, Route, Routes } from 'react-router-dom';

export function AppRoutes() {
	return (
		<Routes>
			<Route element={<div>Main page</div>} path={ROUTE_PATH.MAIN} />
			<Route element={<div>Page Login</div>} path={ROUTE_PATH.LOGIN} />
			<Route
				element={<div>Requests Page</div>}
				path={ROUTE_PATH.REQUESTS}
			/>
			<Route element={<Navigate to={ROUTE_PATH.MAIN} />} path='*' />
		</Routes>
	);
}
