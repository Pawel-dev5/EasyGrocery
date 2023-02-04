// MODELS
import { ShopDataInterface } from 'components/shops/models/hooks';

export interface InitialStateInterface {
	shops: ShopDataInterface[];
	shop: ShopDataInterface | null;
}
