import { ContextProviderProps } from 'config/models';

export interface ListContextProvider extends ContextProviderProps {
	navigation?: any;
}

export interface SingleListEditableInitialInterface {
	isEdited: 'title' | 'items' | null;
	value: {
		title: string | null;
		newItem: {
			value: string | null;
			done: boolean;
			category: string | null;
			uuid: string | null;
			id: number | null;
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
			category: null,
			uuid: null,
			id: null,
		},
	},
};
