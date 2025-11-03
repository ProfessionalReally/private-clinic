import type { User } from '@entities/user';

import { useMutation } from '@tanstack/react-query';

import { login } from './login';

export const useLogin = () =>
	useMutation({
		mutationFn: (data: User) => login(data),
	});
