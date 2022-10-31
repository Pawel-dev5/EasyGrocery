import React from 'react';

// STYLES
import { StyledShopImage, StyledShopsWrapper } from 'components/shops/sections/Styles';

// HELPERS
import { shopsList } from 'components/shops/helpers/ShopsList';

export const DefaultShops = () => {
	return (
		<StyledShopsWrapper>
			{shopsList?.map(({ id, img }) => (
				<StyledShopImage key={id} source={img} style={{ resizeMode: 'contain' }} />
			))}
		</StyledShopsWrapper>
	);
};
