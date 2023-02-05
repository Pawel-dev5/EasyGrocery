import React from 'react';
import { View, Image } from 'react-native';

export const ProductImage = ({ imageUrl, category }: { imageUrl?: string; category: string }) => {
	const imageHandler = () => {
		switch (category) {
			case 'elo':
				return 'elo';
			default:
				return '';
		}
	};

	return <View>{imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 }} />}</View>;
};
