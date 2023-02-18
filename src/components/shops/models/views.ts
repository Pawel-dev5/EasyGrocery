// MODELS
import { ProductInterface } from 'components/shops/models/hooks';

export interface BottomSheetInterface {
	visible: boolean;
	product: ProductInterface | null;
}
