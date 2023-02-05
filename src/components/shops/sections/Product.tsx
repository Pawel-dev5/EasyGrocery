import React, { memo } from 'react';
import { View, Text } from 'react-native';

// COMPONENTS
import { ProductImage } from 'components/shops/items';

// MODELS
import { ProductInterface } from 'components/shops/models/sections';

const Product = ({ attributes, category }: ProductInterface) => {
	const { imageUrl, title, description, prices } = attributes;
	const sortedPrices = prices?.reverse();

	return (
		<View>
			<ProductImage imageUrl={imageUrl} category={category} />
			{title && <Text>{title} </Text>}
			{description && <Text>{description}</Text>}
			{sortedPrices && sortedPrices?.length > 0 && <Text>Cena: {sortedPrices[0]?.price}</Text>}
			{sortedPrices[0]?.promotion !== 'null' && <Text>Promocja: {sortedPrices[0]?.promotion}</Text>}
			{sortedPrices[0]?.promotionDescription !== 'null' && <Text>{sortedPrices[0]?.promotionDescription}</Text>}
		</View>
	);
};

export default memo(Product);
