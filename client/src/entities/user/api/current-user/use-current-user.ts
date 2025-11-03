import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from './get-current-user';

type CurrentUserParams = {
	enabled?: boolean;
};

export const useCurrentUser = ({ enabled }: CurrentUserParams) =>
	useQuery({
		enabled,
		queryFn: getCurrentUser,
		queryKey: ['current-user'],
	});
