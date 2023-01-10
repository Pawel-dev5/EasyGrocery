import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, ScrollView, RefreshControl } from 'react-native';
import { t } from 'i18next';

// CONTEXT
import { ContextProvider, ShopsContextData } from 'components/shops/hooks/useShops';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { DefaultShops, SingleShop } from 'components/shops/sections';

// STYLES
import { StyledShopHeader, StyledMyShopsWrapper } from 'components/shops/views/Styles';

export const ShopsWrapper = (props: any) => {
	const { getShops, isLoading, handleBottomSheetClose, bottomSheetActive } = useContext(ShopsContextData);

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(async () => {
		await setRefreshing(true);
		await getShops();
		await setRefreshing(false);
	}, []);

	useEffect(() => {
		getShops();
	}, []);

	return (
		<AppWrapper
			{...props}
			routeName={t('shops.shops')}
			onClose={handleBottomSheetClose}
			visible={bottomSheetActive}
			isLoading={isLoading}
			bottomSheet={<SingleShop />}
		>
			<ScrollView
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				contentContainerStyle={{ width: '100%' }}
			>
				<StyledShopHeader>{t<string>('shops.myShops')}</StyledShopHeader>

				<StyledMyShopsWrapper>
					<Text>{t<string>('shops.noMyShops')}</Text>
					<Text>{t<string>('shops.addShopCominSoon')}</Text>
				</StyledMyShopsWrapper>

				<StyledShopHeader>{t<string>('general.mostPopular')}</StyledShopHeader>
				<Text>{t<string>('shops.shopDescription')}</Text>
				<Text>{t<string>('shops.shopDescriptionMore')}</Text>

				<DefaultShops />
			</ScrollView>
		</AppWrapper>
	);
};

export const Shops = (props: any) => (
	<ContextProvider>
		<ShopsWrapper {...props} />
	</ContextProvider>
);
