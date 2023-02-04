import React, { memo } from 'react';
import { View, Image, Text } from 'react-native';
import { ShopDataInterface } from '../models/hooks';

const Product = (item: ShopDataInterface) => {
	const {
		attributes: { imageUrl, title, description },
	} = item;
	return (
		<View>
			{imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 }} />}
			{title && <Text>{title}</Text>}
			{description && <Text>{description}</Text>}
		</View>
	);
};

export default memo(Product);
