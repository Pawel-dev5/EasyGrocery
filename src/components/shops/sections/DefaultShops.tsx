import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { REACT_APP_API } from '@env';

// CONTEXT
import { ShopsContextData } from 'components/shops/hooks/useShops';

// STYLES
import { StyledShopImage, StyledShopsWrapper } from 'components/shops/sections/Styles';

export const DefaultShops = () => {
	const { shops, setSingleShop } = useContext(ShopsContextData);
	return (
		<StyledShopsWrapper>
			{shops?.map((shop) => {
				console.log(shop);
				const {
					id,
					attributes: {
						title,
						// image: {
						// 	data: {
						// 		attributes: { url, alternativeText },
						// 	},
						// },
					},
				} = shop;
				return (
					<TouchableOpacity key={id} onPress={() => setSingleShop(shop)}>
						{/* <StyledShopImage
							source={{ uri: `${REACT_APP_API}${url.substring(1)}` }}
							style={{ resizeMode: 'contain' }}
							alt={alternativeText}
						/> */}
						<Text>{title}</Text>
					</TouchableOpacity>
				);
			})}
		</StyledShopsWrapper>
	);
};
