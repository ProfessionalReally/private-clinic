import { queryClient } from '@shared/lib/tanstack-query/query-client';
import { useMutation } from '@tanstack/react-query';

import { addRequest } from './add-request';

export const useAddRequest = () =>
	useMutation({
		mutationFn: addRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['requests'] });
		},
	});
