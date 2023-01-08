import { SetStateAction, Dispatch } from 'react';

import { ContextProviderProps } from 'config/models';
import { ListInterface } from 'components/lists/models/sections';

export interface ListContextProvider extends ContextProviderProps {
	navigation?: any;
	lists?: ListInterface[];
	setLists?: Dispatch<SetStateAction<ListInterface[]>>;
}

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
export const SingleListEditableInitial: SingleListEditableInitialInterface = {
	isEdited: null,
	value: {
		title: null,
		newItem: {
			value: null,
			done: false,
		},
	},
};
