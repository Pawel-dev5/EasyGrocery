import { ReactNode } from 'react';

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
	navigation: { navigate: any; goBack: any; canGoBack: any };
	route: { name: string };
	variant?: VariantType;
	setRefresh?: () => void;
	bottomSheet?: ReactNode | ReactNode[];
	visible?: boolean;
	floatedItems?: FloatedItem[];
	customPadding?: string;
	isLoading?: boolean;
	bottomSheetHeader?: string;
	onClose?: () => void;
	stopSwipe?: boolean;
	searchActive?: boolean;
	globalAddInput?: boolean;
	globalInputLoader?: boolean;
}
