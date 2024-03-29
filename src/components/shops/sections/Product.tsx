import React, { memo } from 'react';

// COMPONENTS
import { ProductImage } from 'components/shops/items';
import { Icon } from 'components/layout/common';

// MODELS
import { ShopDataAttributes } from 'components/shops/models/hooks';

// STYLES
import {
	StyledProductWrapper,
	StyledProdTitle,
	StyledProdDescription,
	StyledProdPrice,
	StyledProdPromotionPrice,
	StyledPricesWrapper,
	StyledAddButton,
	StyledHeader,
} from 'components/shops/sections/Styles';
import { shadowInline } from 'utils/theme/themeDefault';

const Product = ({ attributes }: ShopDataAttributes) => {
	const { imageUrl, title, description, prices } = attributes;
	const sortedPrices = prices?.reverse();

	return (
		<StyledProductWrapper>
			<StyledHeader>
				<ProductImage imageUrl={imageUrl} />

				{title && <StyledProdTitle>{title} </StyledProdTitle>}
				{description && <StyledProdDescription>{description}</StyledProdDescription>}
			</StyledHeader>

			<StyledPricesWrapper>
				{sortedPrices && sortedPrices?.length > 0 && (
					<StyledProdPrice promotion={sortedPrices[0]?.promotion !== 'null'}>{sortedPrices[0]?.price}</StyledProdPrice>
				)}
				{sortedPrices[0]?.promotion !== 'null' && (
					<StyledProdPromotionPrice> {sortedPrices[0]?.promotion}</StyledProdPromotionPrice>
				)}
			</StyledPricesWrapper>

			{sortedPrices[0]?.promotionDescription !== 'null' && (
				<StyledProdDescription>{sortedPrices[0]?.promotionDescription}</StyledProdDescription>
			)}

			<StyledAddButton style={shadowInline}>
				<Icon name="plus" size={20} variant="black" />
			</StyledAddButton>
		</StyledProductWrapper>
	);
};

export default memo(Product);
