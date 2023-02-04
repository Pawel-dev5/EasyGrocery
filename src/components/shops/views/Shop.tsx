import React from 'react';
import { View, Text, Pressable } from 'react-native';

// ROUTER
import { shops as shopsRoutes } from 'routes/AppRoutes';

// REDUX
import { useAppSelector } from 'redux/hooks';
import { selectShops } from 'redux/slices/shops';

// COMPONENTS
import { AppWrapper } from 'components/layout';

// STYLES
import {
	SingleShopWrapper,
	StyledShopImageFull,
	StyledSingleShopHeaderWrapper,
	StyledSingleShopHeader,
	StyledHeader,
	StyledShopCategories,
	StyledShopCategoriesWrapper,
} from 'components/shops/views/Styles';

export const Shop = (props: any) => {
	const shopState = useAppSelector(selectShops);
	const { shop } = shopState;
	const { navigation } = props;

	if (!shop) return null;
	return (
		<AppWrapper
			{...props}
			routeName={shop?.attributes?.title}
			// isLoading={isLoading}
			customPadding="0 0"
		>
			<View>
				<Text>Elo</Text>
				<Text>{shop?.attributes?.title}</Text>
			</View>
			<SingleShopWrapper>
				<StyledSingleShopHeaderWrapper>
					<StyledHeader>
						<StyledShopImageFull
							source={{ uri: shop?.attributes?.image?.data?.attributes?.url }}
							style={{ resizeMode: 'contain' }}
						/>

						{shop?.attributes?.title && <StyledSingleShopHeader>{shop?.attributes?.title}</StyledSingleShopHeader>}
					</StyledHeader>
				</StyledSingleShopHeaderWrapper>

				{shop?.attributes?.orders?.length > 0 && (
					<StyledShopCategoriesWrapper>
						{shop?.attributes?.orders?.map(({ id, value }) => (
							<Pressable
								key={id}
								onPress={() => navigation?.navigate(shopsRoutes.productsList, { id: shop?.id })}
								style={{ width: '45%', height: 150, marginBottom: 10, marginRight: 5, marginLeft: 5 }}
							>
								<StyledShopCategories>
									<Text>{value}</Text>
								</StyledShopCategories>
							</Pressable>
						))}
					</StyledShopCategoriesWrapper>
				)}
			</SingleShopWrapper>
		</AppWrapper>
	);
};
