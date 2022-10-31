import { Dispatch, ReactNode, SetStateAction } from 'react';

// MODELS
import { VariantType } from 'components/layout/models/common';

export interface SectionWrapperInterface {
	children: ReactNode | ReactNode[];
	footer?: ReactNode | ReactNode[];
	navigation?: ReactNode | ReactNode[];
}

interface FloatedItem {
	id: string;
	icon: string;
	size: number;
	variant?: VariantType;
	onPress: () => void;
}

export interface AppLayoutInterface {
	routeName: string;
	children: ReactNode | ReactNode[];
	navigation?: any;
	variant?: VariantType;
	lang: string;
	setLang: Dispatch<SetStateAction<string>>;
	setRefresh?: () => void;
	bottomSheet?: ReactNode | ReactNode[];
	setVisible?: (e: boolean) => void;
	visible?: boolean;
	floatedItems?: FloatedItem[];
	customPadding?: string;
	isLoading?: boolean;
}
