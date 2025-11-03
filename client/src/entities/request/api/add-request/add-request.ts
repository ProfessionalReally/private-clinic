import type { NewRequest } from '@entities/request/model/request-types';

import { api } from '@shared/api/axios';

export const addRequest = async (data: NewRequest) => {
	await api.post('/api/requests', data);
};
