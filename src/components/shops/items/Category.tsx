/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { t } from 'i18next';

// ROUTER
import { shops as shopsRoutes } from 'routes/AppRoutes';

// REDUX
import { selectShops } from 'redux/slices/shops';
import { useAppSelector } from 'redux/hooks';

// STYLES
import { shadowInline } from 'utils/theme/themeDefault';
import { StyledCategoryText, StyledShopCategories, StyledHeader, CategoryInlineStyles } from 'components/shops/items/Styles';

// HELPERS
import { iconHandler } from 'components/shops/helpers/iconHandler';
import { categoriesHandler } from 'components/shops/helpers/categoriesHandler';

export const Category = (props: any) => {
	const shopState = useAppSelector(selectShops);
	const { shop } = shopState;
	const { navigation, value, active } = props;

	return (
		<StyledShopCategories color={iconHandler(value, active)?.color} active={active} style={shadowInline}>
			<StyledHeader active={active}>
				{iconHandler(value, active)?.icon}
				<StyledCategoryText active={active}>{t<string>(`shopCategories.${value}`)}</StyledCategoryText>
			</StyledHeader>

			{active && (
				<ScrollView contentContainerStyle={CategoryInlineStyles.contentContainer} horizontal={false}>
					<View style={CategoryInlineStyles.contentWrapper}>
						{categoriesHandler(value)?.map((item) => (
							<Pressable
								key={item}
								style={CategoryInlineStyles.contentElement}
								onPress={() =>
									navigation?.navigate(shopsRoutes.productsList, {
										id: shop?.id,
										slug: shop?.apiUrl,
										category: [item],
									})
								}
							>
								<Text style={{ fontSize: 11 }}>{t<string>(`shopCategories.${item}`)}</Text>
							</Pressable>
						))}
					</View>
				</ScrollView>
			)}
		</StyledShopCategories>
	);
};
