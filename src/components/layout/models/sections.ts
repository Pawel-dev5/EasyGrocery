export interface MenuElementsInterface {
	id: number;
	icon: string;
	counter?: number;
	link: () => void;
	text: string;
}

export type SearchBarProps = {
	searchActive: boolean;
	fontSize: number;
	routeName: string;
	marginLeft: number | undefined;
	value: string;
	handleInput: (e: string) => void;
};
