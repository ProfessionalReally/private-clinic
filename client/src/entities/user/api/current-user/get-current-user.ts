import type { Id } from '@shared/types/id-types';

import { api } from '@shared/api/axios';

import type { User } from '../../model/user-types';

export type CurrentUserResponse = Id & Omit<User, 'password'>;

export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
	const { data } = await api.get('/api/auth/me');
	return data;
};
