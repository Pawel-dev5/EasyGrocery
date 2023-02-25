import { SetStateAction, Dispatch } from 'react';

import { ListInterface } from 'components/lists/models/sections';

export interface UseListInterface {
	lists?: ListInterface[];
	setLists?: Dispatch<SetStateAction<ListInterface[]>>;
}

export interface UpdateCustomOrderInterface {
	id?: number;
	value: string;
	priority: number;
}
