// MODELS
import { SingleListEditableInitialInterface } from 'components/lists/models/hooks';
import { SingleListInterface } from 'components/lists/models/items';
import { ListInterface } from 'components/lists/models/sections';

export interface InitialStateInterface {
	lists: ListInterface[];
	list: SingleListInterface | null;
	listEditable: SingleListEditableInitialInterface;
}
