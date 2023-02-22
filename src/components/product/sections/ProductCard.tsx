import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';

// ROUTING
import { product } from 'routes/AppRoutes';

// REDUX
import { useAppDispatch } from 'redux/hooks';
import { productSetProduct } from 'redux/slices/product';

// COMPONENTS
import { ProductImage } from 'components/shops/items';
import { Icon } from 'components/layout/common';

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
} from 'components/product/sections/Styles';
import { shadowInline } from 'utils/theme/themeDefault';

// MODELS
import { ProductPropsInterface } from 'components/shops/models/sections';

const ProductCard = ({
	id,
	imageUrl,
	title,
	description,
	prices,
	category,
	createdAt,
	updatedAt,
	navigation,
	shopSlug,
	customWidth,
	setBottomSheetState,
}: ProductPropsInterface) => {
	const dispatch = useAppDispatch();
	const sortedPrices = prices?.reverse();

	return (
		<StyledProductWrapper customWidth={customWidth}>
			<TouchableOpacity
				onPress={() => {
					dispatch(
						productSetProduct({ id, imageUrl, title, description, prices: sortedPrices, category, createdAt, updatedAt }),
					);
					navigation?.navigate(product.product, { shop: shopSlug, category, slug: title });
				}}
			>
				<StyledHeader>
					<ProductImage imageUrl={imageUrl} />
					{title && <StyledProdTitle>{title} </StyledProdTitle>}
					{description && <StyledProdDescription>{description}</StyledProdDescription>}
				</StyledHeader>

				<StyledPricesWrapper>
					{sortedPrices && sortedPrices?.length > 0 && (
						<StyledProdPrice promotion={sortedPrices[0]?.promotion !== 'null'}>{sortedPrices[0]?.price}</StyledProdPrice>
					)}
					{sortedPrices && sortedPrices[0]?.promotion !== 'null' && (
						<StyledProdPromotionPrice> {sortedPrices[0]?.promotion}</StyledProdPromotionPrice>
					)}
				</StyledPricesWrapper>

				{sortedPrices && sortedPrices[0]?.promotionDescription !== 'null' && (
					<StyledProdDescription>{sortedPrices[0]?.promotionDescription}</StyledProdDescription>
				)}
			</TouchableOpacity>

			<StyledAddButton
				style={shadowInline}
				onPress={() => {
					if (setBottomSheetState)
						setBottomSheetState({
							visible: true,
							product: { id, imageUrl, title, description, prices, category, createdAt, updatedAt },
						});
				}}
			>
				<Icon name="plus" size={20} variant="black" />
			</StyledAddButton>
		</StyledProductWrapper>
	);
};

export default memo(ProductCard);
