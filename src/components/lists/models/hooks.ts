import { SetStateAction, Dispatch } from 'react';

import { ListInterface } from 'components/lists/models/sections';

export interface SingleListEditableInitialInterface {
	isEdited: 'title' | 'items' | null;
	value: {
		title: string | null;
		newItem: {
			value: string | null;
			done: boolean;
			category?: string;
			uuid?: string;
			id?: number;
		};
	};
}

export interface UseListInterface {
	lists?: ListInterface[];
	setLists?: Dispatch<SetStateAction<ListInterface[]>>;
}
