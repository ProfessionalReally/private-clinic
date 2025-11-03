import { queryClient } from '@shared/lib/tanstack-query/query-client';
import { useMutation } from '@tanstack/react-query';

import { logout } from './logout';

export const useLogout = () =>
	useMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.clear();
		},
	});
