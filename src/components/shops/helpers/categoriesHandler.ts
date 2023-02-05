import { CarrefourCategories } from 'utils/productCategoriesHandler';

export const categoriesHandler = (url: string, category: string) => {
	const newArr = [];

	if (url === 'carrefours') {
		Object.entries(CarrefourCategories).forEach(([key, value]) => {
			if (key === category) newArr.push(...value);
		});
	} else newArr.push(category);

	return newArr;
};
