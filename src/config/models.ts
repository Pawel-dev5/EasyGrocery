import { ReactNode } from 'react';
import { ListInterface } from 'components/lists/models/sections';

export interface ContextProviderProps {
	children?: ReactNode | ReactNode[] | null;
}

export interface User {
	blocked: boolean | null;
	confirmed: boolean | null;
	createdAt: string | null;
	email: string | null;
	id: string | null;
	provider: string | null;
	updatedAt: string | null;
	username: string | null;
	lists: ListInterface[];
}

export interface UserDataInterface {
	jwt: string | null;
	user: User | null;
}
