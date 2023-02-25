import { ItemInterface } from 'components/lists/models/sections';

export interface DataListInterface {
	id?: number;
	category: string;
	priority: number;
	items: ItemInterface[];
	childCategories: string[];
}

export interface ExpandListDataInterface extends DataListInterface {
	isExpanded: boolean;
}

export interface ExpandableListInterface {
	data: DataListInterface[];
	bottomSheetHeight: number;
	onDragEnd: (arg: ExpandListDataInterface[]) => void;
}
