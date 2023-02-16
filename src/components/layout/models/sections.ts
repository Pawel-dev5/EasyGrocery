import { Dispatch, SetStateAction } from 'react';

export interface MenuElementsInterface {
	id: number;
	icon: string;
	counter?: number;
	link: () => void;
	text: string;
}

export type SearchBarProps = {
	globalInputValue: string;
	setGlobalInputValue: Dispatch<SetStateAction<string>>;
	searchActive: boolean;
	fontSize: number;
	routeName: string;
	marginLeft: number | undefined;
};
