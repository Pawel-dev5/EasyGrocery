import { ImageSourcePropType } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

interface ShopInterface {
	id: string;
	title: string;
	img: ImageSourcePropType;
	order: string[];
}

export const shopsList: ShopInterface[] = [
	{
		id: uuidv4(),
		title: 'Biedronka',
		img: require('assets/shops/biedronka.jpg'),
		order: ['owoce i warzywa', 'napoje', 'mięso', 'nabiał'],
	},
	{
		id: uuidv4(),
		title: 'Lidl',
		img: require('assets/shops/lidl.png'),
		order: ['owoce i warzywa', 'napoje', 'mięso', 'nabiał'],
	},
	{
		id: uuidv4(),
		title: 'Auchan',
		img: require('assets/shops/Auchan.png'),
		order: ['owoce i warzywa', 'napoje', 'mięso', 'nabiał'],
	},
	{
		id: uuidv4(),
		title: 'Aldi',
		img: require('assets/shops/aldi.png'),
		order: ['owoce i warzywa', 'napoje', 'mięso', 'nabiał'],
	},
	{
		id: uuidv4(),
		title: 'Kaufland',
		img: require('assets/shops/Kaufland.png'),
		order: ['owoce i warzywa', 'napoje', 'mięso', 'nabiał'],
	},
];
