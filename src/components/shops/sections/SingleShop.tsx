import React, { useContext } from 'react';
import { Text } from 'react-native';
import { t } from 'i18next';

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
	StyledHeader,
	StyledShopCategories,
	StyledShopCategoriesWrapper,
	StyledCategoriesDescription,
	StyledCategoriesDescriptionWrapper,
	StyledCategoriesDescriptionWrapper2,
} from 'components/shops/sections/Styles';

export const SingleShop = () => {
	const { singleShop } = useContext(ShopsContextData);

	if (singleShop) {
		return (
			<SingleShopWrapper>
				<StyledSingleShopHeaderWrapper>
					<StyledHeader>
						<StyledShopImageFull
							source={{ uri: singleShop?.attributes?.image?.data?.attributes?.url }}
							style={{ resizeMode: 'contain' }}
						/>

						{singleShop?.attributes?.title && (
							<StyledSingleShopHeader>{singleShop?.attributes?.title}</StyledSingleShopHeader>
						)}
					</StyledHeader>
				</StyledSingleShopHeaderWrapper>

				<Text>{t<string>('shops.shopCategories')}</Text>

				{singleShop?.attributes?.orders?.length > 0 && (
					<StyledShopCategoriesWrapper>
						<StyledCategoriesDescriptionWrapper>
							<StyledCategoriesDescription>{t<string>('general.entrance')}</StyledCategoriesDescription>
							<Icon name="door-open" size={20} />
						</StyledCategoriesDescriptionWrapper>

						{singleShop?.attributes?.orders?.map(({ id, value }) => (
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
