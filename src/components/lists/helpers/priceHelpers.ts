export const listPricesSum = (listItems: any) => {
	let sum = 0;
	if (listItems) {
		listItems?.forEach((item: any) => {
			if (item.prices && item?.prices[0]) {
				const itemPrice = Number(item.prices[0].price?.replace('zł', '')?.replace(',', '.'));
				const itemPricePromotion = Number(item.prices[0].promotion?.replace('zł', '')?.replace(',', '.'));
				if (itemPricePromotion) {
					sum += itemPricePromotion;
				} else sum += itemPrice;
			}
		});

		if (sum > 0) {
			const allSum = (Math.round(sum * 100) / 100)?.toString()?.replace('.', ',');
			return `${allSum} zł`;
		}
	}
	return null;
};
