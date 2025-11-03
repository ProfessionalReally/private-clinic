import { api } from '@shared/api/axios';

export const logout = async () => {
	await api.post('/api/auth/logout');
};
