import { CarrefourCategories } from 'utils/productCategoriesHandler';

export const categoriesHandler = (category: string) => {
	const newArr = [];
	if (category.includes('Carrefour')) {
		Object.entries(CarrefourCategories).forEach(([key, value]) => {
			if (key === category) newArr.push(...value);
		});
	} else newArr.push(category);

	return newArr;
};
