import React, { useContext } from 'react';
import { REACT_APP_API } from '@env';

// CONTEXT
import { ShopsContextData } from 'components/shops/hooks/useShops';

// STYLES
import { StyledShopImage, StyledShopsWrapper } from 'components/shops/sections/Styles';
import { TouchableOpacity } from 'react-native';

export const DefaultShops = () => {
	const { shops, setSingleShop } = useContext(ShopsContextData);

	return (
		<StyledShopsWrapper>
			{shops?.map((shop) => {
				const {
					id,
					attributes: {
						image: {
							data: {
								attributes: { url, alternativeText },
							},
						},
					},
				} = shop;
				return (
					<TouchableOpacity key={id} onPress={() => setSingleShop(shop)}>
						<StyledShopImage
							source={{ uri: `${REACT_APP_API}${url.substring(1)}` }}
							style={{ resizeMode: 'contain' }}
							alt={alternativeText}
						/>
					</TouchableOpacity>
				);
			})}
		</StyledShopsWrapper>
	);
};
