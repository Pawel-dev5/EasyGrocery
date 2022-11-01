import React, { useContext, useEffect } from 'react';
import { Text, ScrollView } from 'react-native';
import { t } from 'i18next';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';
import { ContextProvider, ShopsContextData } from 'components/shops/hooks/useShops';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { Loader } from 'components/layout/common';
import { DefaultShops, SingleShop } from 'components/shops/sections';

// STYLES
import { StyledShopHeader, StyledMyShopsWrapper } from 'components/shops/views/Styles';

export const ShopsWrapper = (props: any) => {
	const { lang, setLang } = useContext(GlobalContextData);
	const { getShops, isLoading, handleBottomSheetClose, visible } = useContext(ShopsContextData);

	useEffect(() => {
		getShops();
	}, []);

	if (isLoading) return <Loader size={100} />;

	return (
		<AppWrapper
			{...props}
			routeName={t('shops.shops')}
			lang={lang}
			setLang={setLang}
			onClose={handleBottomSheetClose}
			visible={visible}
			bottomSheet={<SingleShop />}
		>
			<ScrollView contentContainerStyle={{ width: '100%' }}>
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
