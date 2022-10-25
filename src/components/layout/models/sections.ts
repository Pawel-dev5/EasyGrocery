import { Dispatch, SetStateAction } from 'react';

// MODELS
import { VariantType } from 'components/layout/models/items';

export interface MenuInterface {
	variant: VariantType;
	navigation: any;
	lang: string;
	setLang: Dispatch<SetStateAction<string>>;
}
