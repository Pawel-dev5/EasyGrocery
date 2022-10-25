import { Dispatch, ReactNode, SetStateAction } from 'react';

// MODELS
import { VariantType } from 'components/layout/models/items';

export interface SectionWrapperInterface {
	children: ReactNode | ReactNode[];
	footer?: ReactNode | ReactNode[];
	navigation?: ReactNode | ReactNode[];
}

export interface AppLayoutInterface {
	routeName: string;
	children: ReactNode;
	navigation?: any;
	variant?: VariantType;
	lang: string;
	setLang: Dispatch<SetStateAction<string>>;
}
