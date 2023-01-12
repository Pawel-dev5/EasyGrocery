import { Dispatch, SetStateAction } from 'react';

export interface EditItemInterface {
	title?: string;
	category?: string | null;
}

export interface EditListFormInterface {
	bottomSheetHeight: number;
	setNewColor: Dispatch<SetStateAction<string | null>>;
}
