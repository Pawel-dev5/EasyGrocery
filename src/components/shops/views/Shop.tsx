import React from 'react';
import { Pressable, ScrollView } from 'react-native';

// ROUTER
import { shops as shopsRoutes } from 'routes/AppRoutes';

// REDUX
import { useAppSelector } from 'redux/hooks';
import { selectShops } from 'redux/slices/shops';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { Category } from 'components/shops/sections';

// STYLES
import { StyledShopImageFull, StyledHeader, StyledShopCategoriesWrapper } from 'components/shops/views/Styles';

export const Shop = (props: any) => {
	const shopState = useAppSelector(selectShops);
	const { shop } = shopState;
	const { navigation } = props;

	if (!shop) return null;
	return (
		<AppWrapper {...props} routeName={shop?.attributes?.title} customPadding="0 0">
			<ScrollView>
				<StyledHeader>
					<StyledShopImageFull
						source={{ uri: shop?.attributes?.image?.data?.attributes?.url }}
						style={{ resizeMode: 'cover' }}
					/>
				</StyledHeader>

				{shop?.attributes?.orders?.length > 0 && (
					<StyledShopCategoriesWrapper>
						{shop?.attributes?.orders?.map(({ id, value }) => (
							<Pressable
								key={id}
								onPress={() =>
									navigation?.navigate(shopsRoutes.productsList, {
										id: shop?.id,
										slug: shop?.attributes?.apiUrl,
										category: value,
									})
								}
								style={{ width: '45%', height: 150, marginBottom: 10, marginRight: 5, marginLeft: 5 }}
							>
								<Category value={value} />
							</Pressable>
						))}
					</StyledShopCategoriesWrapper>
				)}
			</ScrollView>
		</AppWrapper>
	);
};
