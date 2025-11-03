import type { User } from '@entities/user';

import { api } from '@shared/api/axios';

export const login = async (data: User) => {
	await api.post('/api/auth/login', data);
};
