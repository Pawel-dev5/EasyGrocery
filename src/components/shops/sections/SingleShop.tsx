import React, { useContext } from 'react';
import { Text } from 'react-native';
import { t } from 'i18next';
import { REACT_APP_API } from '@env';

// CONTEXT
import { ShopsContextData } from 'components/shops/hooks/useShops';

// COMPONENTS
import { Icon } from 'components/layout/common';

// STYLES
import {
	SingleShopWrapper,
	StyledShopImageFull,
	StyledSingleShopHeaderWrapper,
	StyledSingleShopHeader,
	StyledCloseButton,
	StyledHeader,
	StyledShopCategories,
	StyledShopCategoriesWrapper,
	StyledCategoriesDescription,
	StyledCategoriesDescriptionWrapper,
	StyledCategoriesDescriptionWrapper2,
} from 'components/shops/sections/Styles';

export const SingleShop = () => {
	const { singleShop, handleBottomSheetClose } = useContext(ShopsContextData);
	if (singleShop) {
		const {
			attributes: {
				title,
				image: {
					data: {
						attributes: { url, alternativeText },
					},
				},
				orders,
			},
		} = singleShop;

		return (
			<SingleShopWrapper>
				<StyledSingleShopHeaderWrapper>
					<StyledHeader>
						<StyledShopImageFull
							source={{ uri: `${REACT_APP_API}${url?.substring(1)}` }}
							style={{ resizeMode: 'contain' }}
							alt={alternativeText}
						/>

						{title && <StyledSingleShopHeader>{title}</StyledSingleShopHeader>}
					</StyledHeader>

					<StyledCloseButton onPress={() => handleBottomSheetClose()}>
						<Icon name="times" size={20} />
					</StyledCloseButton>
				</StyledSingleShopHeaderWrapper>

				<Text>{t<string>('shops.shopCategories')}</Text>

				{orders?.length > 0 && (
					<StyledShopCategoriesWrapper>
						<StyledCategoriesDescriptionWrapper>
							<StyledCategoriesDescription>{t<string>('general.entrance')}</StyledCategoriesDescription>
							<Icon name="door-open" size={20} />
						</StyledCategoriesDescriptionWrapper>

						{orders?.map(({ id, value }) => (
							<StyledShopCategories key={id}>{value}</StyledShopCategories>
						))}

						<StyledCategoriesDescriptionWrapper2>
							<StyledCategoriesDescription>{t<string>('general.cash')}</StyledCategoriesDescription>
							<Icon name="cash-register" size={20} />
						</StyledCategoriesDescriptionWrapper2>
					</StyledShopCategoriesWrapper>
				)}
			</SingleShopWrapper>
		);
	}
	return null;
};
