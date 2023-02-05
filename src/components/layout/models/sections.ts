export interface MenuElementsInterface {
	id: number;
	icon: string;
	counter?: number;
	link: () => void;
	text: string;
}
