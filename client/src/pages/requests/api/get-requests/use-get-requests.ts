import { useQuery } from '@tanstack/react-query';

import { getRequests } from './get-request';

export const useGetRequests = () =>
	useQuery({
		queryFn: getRequests,
		queryKey: ['requests'],
	});
