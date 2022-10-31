import { ImageSourcePropType } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

interface ShopInterface {
	id: string;
	title: string;
	img: ImageSourcePropType;
}

export const shopsList: ShopInterface[] = [
	{
		id: uuidv4(),
		title: 'Biedronka',
		img: require('assets/shops/biedronka.jpg'),
	},
	{
		id: uuidv4(),
		title: 'Lidl',
		img: require('assets/shops/lidl.png'),
	},
	{
		id: uuidv4(),
		title: 'Auchan',
		img: require('assets/shops/Auchan.png'),
	},
	{
		id: uuidv4(),
		title: 'Aldi',
		img: require('assets/shops/aldi.png'),
	},
	{
		id: uuidv4(),
		title: 'Kaufland',
		img: require('assets/shops/Kaufland.png'),
	},
];
