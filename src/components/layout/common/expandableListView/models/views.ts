import { ItemInterface } from 'components/lists/models/sections';

export interface ExpandListInterface extends DataListInterface {
	isExpanded: boolean;
}

export interface DataListInterface {
	category: string;
	items: ItemInterface[];
	childCategories: string[];
}
