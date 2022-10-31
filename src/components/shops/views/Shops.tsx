import React, { useContext } from 'react';
import { Text, ScrollView } from 'react-native';
import { t } from 'i18next';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

// COMPONENTS
import { AppWrapper } from 'components/layout';

// CONSTANS
import { DefaultShops } from 'components/shops/sections';

// STYLES
import { StyledShopHeader, StyledMyShopsWrapper } from 'components/shops/views/Styles';

export const Shops = (props: any) => {
	const { lang, setLang } = useContext(GlobalContextData);

	return (
		<AppWrapper {...props} routeName={t('shops.shops')} lang={lang} setLang={setLang}>
			<ScrollView contentContainerStyle={{ width: '100%' }}>
				<StyledShopHeader>{t<string>('shops.myShops')}</StyledShopHeader>
				<StyledMyShopsWrapper>
					<Text>Brak sklepów na liście. </Text>
					<Text>Dodawanie swoich sklepów będzie możliwe wkrótce</Text>
				</StyledMyShopsWrapper>

				<StyledShopHeader>{t<string>('general.mostPopular')}</StyledShopHeader>
				<DefaultShops />
			</ScrollView>
		</AppWrapper>
	);
};
