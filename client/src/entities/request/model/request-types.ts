import type { Id } from '@shared/types/id-types';

export type NewRequest = Omit<Request, 'date'>;

export type Request = {
	date: string;
	fullName: string;
	phone: string;
	problemDescription: string;
};

export type RequestsWithId = Id & Request;
