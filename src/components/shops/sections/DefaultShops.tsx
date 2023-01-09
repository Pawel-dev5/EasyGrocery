import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';

// CONTEXT
import { ShopsContextData } from 'components/shops/hooks/useShops';

// STYLES
import { StyledShopImage, StyledShopsWrapper } from 'components/shops/sections/Styles';

export const DefaultShops = () => {
	const { shops, setSingleShop } = useContext(ShopsContextData);

	return (
		<StyledShopsWrapper>
			{shops?.map((shop) => (
				<TouchableOpacity key={shop?.id} onPress={() => setSingleShop(shop)}>
					<StyledShopImage
						source={{ uri: shop?.attributes?.image?.data?.attributes?.url }}
						style={{ resizeMode: 'contain' }}
					/>
				</TouchableOpacity>
			))}
		</StyledShopsWrapper>
	);
};
