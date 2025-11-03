import type { RequestsWithId } from '@entities/request';

import { api } from '@shared/api/axios';

export const getRequests = async (): Promise<RequestsWithId[]> => {
	const { data } = await api.get('/api/requests');
	return data;
};
