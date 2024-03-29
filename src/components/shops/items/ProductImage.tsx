import React from 'react';
import { Image } from 'react-native';

// STYLES
import { StyledProdImageWrapper } from 'components/shops/items/Styles';

export const ProductImage = ({ imageUrl }: { imageUrl?: string }) => (
	<StyledProdImageWrapper>
		{imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 110, height: 110 }} />}
	</StyledProdImageWrapper>
);
