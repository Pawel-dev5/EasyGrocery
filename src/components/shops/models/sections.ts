import { ListInterface } from 'components/lists/models/sections';
import { AddProductInterface } from 'components/shops/models/hooks';
import { BottomSheetInterface } from 'components/shops/models/views';

export interface BottomSheetRenderItemInterface {
	item: ListInterface;
	bottomSheetState: BottomSheetInterface;
	addProductToList: ({ list, product, callbackOnSuccess }: AddProductInterface) => void;
}
