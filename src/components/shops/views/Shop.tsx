import React, { useState } from 'react';
import { Pressable, ScrollView } from 'react-native';

// ROUTER
import { shops as shopsRoutes } from 'routes/AppRoutes';

// REDUX
import { useAppSelector } from 'redux/hooks';
import { selectShops } from 'redux/slices/shops';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { Category } from 'components/shops/items';

// STYLES
import { StyledShopImageFull, StyledHeader, StyledShopCategoriesWrapper } from 'components/shops/views/Styles';

export const Shop = (props: any) => {
	const shopState = useAppSelector(selectShops);
	const { shop } = shopState;
	const { navigation } = props;

	const [current, setCurrent] = useState<string | null>(null);

	if (!shop) return null;

	return (
		<AppWrapper {...props} routeName={shop?.title} customPadding="0 0" stopSwipe>
			<ScrollView>
				<StyledHeader>
					<StyledShopImageFull source={{ uri: shop?.image?.url }} style={{ resizeMode: 'cover' }} />
				</StyledHeader>

				{shop?.orders?.length > 0 && (
					<StyledShopCategoriesWrapper>
						{shop?.orders?.map(({ id, value }) => {
							const categoryProps = {
								value,
								active: current === id,
								...props,
							};
							return (
								<Pressable
									key={id}
									onPress={() => {
										if (current !== id) {
											navigation?.navigate(shopsRoutes.productsList, {
												id: shop?.id,
												slug: shop?.apiUrl,
												category: value,
											});
											setCurrent(null);
										}
									}}
									onLongPress={() => {
										if (value?.includes('Carrefour')) setCurrent(id);
									}}
									style={{
										width: current === id ? '100%' : '45%',
										height: 150,
										marginBottom: 10,
										marginRight: 5,
										marginLeft: 5,
									}}
								>
									<Category {...categoryProps} />
								</Pressable>
							);
						})}
					</StyledShopCategoriesWrapper>
				)}
			</ScrollView>
		</AppWrapper>
	);
};
