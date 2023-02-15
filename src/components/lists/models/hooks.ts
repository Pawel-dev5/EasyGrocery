import { SetStateAction, Dispatch } from 'react';

import { ListInterface } from 'components/lists/models/sections';
import { PriceInterface } from 'components/shops/models/hooks';

export interface SingleListEditableInitialInterface {
	isEdited: 'title' | 'items' | null;
	value: {
		title: string | null;
		newItem: {
			id?: number;
			uuid?: string;
			title: string | null;
			done: boolean;
			category?: string;
			prices?: PriceInterface[];
		};
	};
}

export interface UseListInterface {
	lists?: ListInterface[];
	setLists?: Dispatch<SetStateAction<ListInterface[]>>;
}
