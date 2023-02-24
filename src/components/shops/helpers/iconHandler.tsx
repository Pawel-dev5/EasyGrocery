/* eslint-disable global-require */
import { Image } from 'react-native';

// COMPONENTS
import { Icon } from 'components/layout/common';

type IconVariantType = 'mini';

const handleIconStyleSize = (active: boolean, variant?: IconVariantType) => {
	switch (variant) {
		case 'mini': {
			return {
				width: 20,
				height: 20,
			};
		}

		default: {
			if (active) {
				return {
					width: 30,
					height: 30,
				};
			}
			return {
				width: 40,
				height: 40,
			};
		}
	}
};

const handleIconFontSize = (variant?: IconVariantType) => {
	switch (variant) {
		case 'mini': {
			return 19;
		}

		default: {
			return 35;
		}
	}
};

export const iconHandler = (value: string, active: boolean, variant?: IconVariantType) => {
	switch (value) {
		case 'faceRossman':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/face.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(248, 230, 230)',
			};
		case 'makeUpRossman':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/makeUp.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(236, 244, 255)',
			};
		case 'hairRossman':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/hair.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(235, 255, 237)',
			};
		case 'bodyRossman':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/body.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(255, 240, 210)',
			};
		case 'cleanRossman':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/hygiene.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(255, 253, 236)',
			};
		case 'perfumeRossman':
		case 'drogeryCarrefour':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/perfume.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(255, 239, 248)',
			};
		case 'babyRossman':
		case 'babyCarrefour':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/babyandMom.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(244, 239, 255)',
			};
		case 'manRossman':
			return {
				icon: <Icon name="user" size={handleIconFontSize(variant)} />,
				color: 'rgb(248, 207, 207)',
			};
		case 'mainFoodCarrefour':
		case 'foodRossman':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/food.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(235, 255, 237)',
			};
		case 'specjalRossman':
		case 'unusualShopping':
			return {
				icon: <Icon name="star" size={handleIconFontSize(variant)} />,
				color: 'rgb(255, 243, 243)',
			};
		case 'homeCleanRossman':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/homeCleaning.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(237, 252, 255)',
			};
		case 'healthRossman':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/health.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(207, 248, 211)',
			};
		case 'homeRossman':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/homeEquipment.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(214, 216, 234)',
			};
		case 'petsRossman':
		case 'forPets':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/pets.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(247, 255, 236)',
			};
		case 'diaryCarrefour':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/dairy.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(236, 244, 255)',
			};
		case 'drinksCarrefour':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/softDrinks.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(255, 240, 210)',
			};
		case 'healthyCarrefour':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/healthyFood.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(248, 207, 207)',
			};
		case 'readyDishesCarrefour':
		case 'readyFoodsApetizersCarrefour':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/readyToEat.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(237, 252, 255)',
			};
		case 'fruitsMainCarrefour':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/vegetablesAndFruits.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(195, 223, 205)',
			};
		case 'frostCarrefour':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/fronst.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(220, 224, 240)',
			};
		case 'meatCarrefour':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/meat.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(240, 220, 224)',
			};
		case 'bakeryCarrefour':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/bakery.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(239, 240, 220)',
			};
		case 'fishSeaFoodCarrefour':
			return {
				icon: (
					<Image
						source={require('../../../assets/shops/categories/seaFood.png')}
						style={handleIconStyleSize(active, variant)}
					/>
				),
				color: 'rgb(240, 232, 220)',
			};
		default:
			return {};
	}
};
