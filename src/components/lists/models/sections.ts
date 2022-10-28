export interface ItemInterface {
	id: string;
	value: string;
	done: boolean;
}

export interface ListInterface {
	id: string;
	attributes: {
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		title: string;
		descriptrion: string;
		items: ItemInterface[];
	};
}
