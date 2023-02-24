import { ExpandListInterface } from 'components/layout/common/expandableListView/models/views';

export interface ExpandableComponentInterface {
	item: ExpandListInterface;
	onClickFunction: () => void;
}
