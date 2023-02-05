import { ShopDataInterface } from 'components/shops/models/hooks';

export const convertPrices = ({ url, data }: { url: string; data: ShopDataInterface[] }) => {
	const pricesKey = `${url}Prices`;
	const newArr: ShopDataInterface[] = [];
	if (data) {
		data?.forEach((item) => {
			const newValue = {
				id: item.id,
				attributes: {
					...item?.attributes,
					prices: item?.attributes?.[pricesKey],
				},
			};
			delete newValue?.attributes?.[pricesKey];
			newArr.push(newValue);
		});
	}

	return newArr;
};
