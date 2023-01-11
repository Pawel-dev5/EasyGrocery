// MODELS
import { ItemInterface } from 'components/lists/models/sections';

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
