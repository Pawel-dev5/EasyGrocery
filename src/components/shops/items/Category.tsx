/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Pressable, ScrollView, Text, View, StyleSheet } from 'react-native';
import { t } from 'i18next';

// ROUTER
import { shops as shopsRoutes } from 'routes/AppRoutes';

// REDUX
import { selectShops } from 'redux/slices/shops';
import { useAppSelector } from 'redux/hooks';

// STYLES
import { shadowInline } from 'utils/theme/themeDefault';
import { StyledCategoryText, StyledShopCategories, StyledHeader } from 'components/shops/items/Styles';

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
				<ScrollView contentContainerStyle={styles.contentContainer} horizontal={false}>
					<View style={styles.contentWrapper}>
						{categoriesHandler(value)?.map((item) => (
							<Pressable
								key={item}
								style={styles.contentElement}
								onPress={() =>
									navigation?.navigate(shopsRoutes.productsList, {
										id: shop?.id,
										slug: shop?.attributes?.apiUrl,
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

const styles = StyleSheet.create({
	contentContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	contentWrapper: {
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	contentElement: {
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#000000',
		marginBottom: 4,
		marginRight: 4,
		paddingLeft: 12,
		paddingRight: 12,
		paddingBottom: 8,
		paddingTop: 8,
		alignSelf: 'flex-start',
		fontSize: 8,
	},
});
