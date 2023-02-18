export const convertListShopAttrubites = (response: any) => {
	const responseShop = response?.attributes?.shop?.data;
	const responseImage = responseShop?.attributes?.image?.data;
	const shopImage = response?.attributes?.image?.data;

	const newValues = {
		id: response?.id,
		...{
			...response?.attributes,
			shop: {
				id: responseShop?.id,
				...{
					...responseShop?.attributes,
					image: {
						id: responseImage?.id,
						...responseImage?.attributes,
					},
				},
			},
		},
	};

	const shopValues = {
		id: response?.id,
		...{
			...response?.attributes,
			image: {
				id: shopImage?.id,
				...shopImage?.attributes,
			},
		},
	};

	if (shopImage) {
		return shopValues;
	}
	return newValues;
};
