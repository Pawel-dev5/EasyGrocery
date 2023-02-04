import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, RefreshControl, TouchableOpacity, View } from 'react-native';
import { t } from 'i18next';

// ROUTER
import { shops as shopsRoutes } from 'routes/AppRoutes';

// REDUX
import { selectShops, shopsSetshop } from 'redux/slices/shops';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

// HOOKS
import { useShops } from 'components/shops/hooks/useShops';

// COMPONENTS
import { AppWrapper } from 'components/layout';

// STYLES
import { StyledShopImage, StyledShopsWrapper } from 'components/shops/views/Styles';

// UTILS
import { generateBoxShadowStyle } from 'utils/helpers/generateBoxShadow';

export const Shops = (props: any) => {
	const dispatch = useAppDispatch();
	const shopsState = useAppSelector(selectShops);
	const { shops } = shopsState;
	const { navigation } = props;

	const { getShops, isLoading } = useShops();

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await getShops();
		setRefreshing(false);
	}, []);

	useEffect(() => {
		getShops();
	}, []);

	return (
		<AppWrapper {...props} routeName={t('shops.shops')} isLoading={isLoading} customPadding="0 0">
			<ScrollView
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				contentContainerStyle={{ width: '100%' }}
			>
				<StyledShopsWrapper>
					{shops?.map((shop) => (
						<TouchableOpacity
							key={shop?.id}
							onPress={() => {
								dispatch(shopsSetshop(shop));
								navigation?.navigate(shopsRoutes.shop, { id: shop?.id });
							}}
						>
							<View
								style={{
									...generateBoxShadowStyle(-2.5, 4.5, '#171717', 0.4, 3.5, 5, '#171717'),
									marginLeft: 14,
									marginRight: 14,
									minWidth: 100,
									minHeight: 100,
								}}
							>
								<StyledShopImage
									source={{ uri: shop?.attributes?.image?.data?.attributes?.url }}
									style={{ resizeMode: 'cover' }}
								/>
							</View>
						</TouchableOpacity>
					))}
				</StyledShopsWrapper>
			</ScrollView>
		</AppWrapper>
	);
};
