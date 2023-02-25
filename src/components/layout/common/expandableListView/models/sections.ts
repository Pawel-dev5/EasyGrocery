import { ExpandListDataInterface } from 'components/layout/common/expandableListView/models/views';

export interface ExpandableComponentInterface {
	item: ExpandListDataInterface;
	onClickFunction: () => void;
	isActive: boolean;
	drag: () => void;
}
