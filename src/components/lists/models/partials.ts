// MODELS
import { ItemInterface } from 'components/lists/models/sections';
import { Dispatch, SetStateAction } from 'react';

export interface ListItemInterface {
	listItems: ItemInterface[];
	bottomSheetHeight: number;
}

export interface SubmitAlertInterface {
	okPressed: () => void;
	cancelPressed: () => void;
	okText: string;
	cancelText: string;
	alertTitle: string;
	alertMessage?: string;
}

export interface ColorButtonsInterface {
	setValue: (arg0: 'color' | 'title', arg1: string) => void;
	value: string | null | undefined;
	setNewColor: Dispatch<SetStateAction<string | null>>;
}
