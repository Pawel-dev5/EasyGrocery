/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback, useEffect, useState } from 'react';
import { View, RefreshControl, FlatList, Platform, StyleSheet } from 'react-native';
import { t } from 'i18next';

// HOOKS
import { useProductsList } from 'components/shops/hooks/useProductsList';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { Product } from 'components/shops/sections';
import { Icon } from 'components/layout/common';

// STYLES
import { StyledListHeaderWrapper, StyledListHeader } from 'components/shops/views/Styles';

export const ProductsList = (props: any) => {
	const {
		route: {
			params: { slug, category },
		},
	} = props;

	const {
		isLoading,
		productsList,
		lastWeekPromotions,
		totalProductsCount,
		totalPromotionsCount,
		getProducts,
		getProductsOffset,
	} = useProductsList({
		url: slug,
		category,
	});

	const [refreshing, setRefreshing] = useState(false);
	const [scrollOffset, setScrollOffset] = useState(0);
	const [offsetLoading, setOffsetLoading] = useState(false);
	const [expandedList, setExpandedList] = useState(true); // IF TRUE SHOW PROMOTION IF FALSE SHOW REST
	const [page, setPage] = useState(1);
	const itemElementHeight = 150;

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await getProducts();
		setRefreshing(false);
	}, []);

	const layoutHeight = useCallback(() => {
		let height = 0;
		if (productsList && productsList?.length > 0) height = productsList.length * itemElementHeight - 1000;
		return height;
	}, [productsList]);

	useEffect(() => {
		getProducts();
	}, []);

	useEffect(() => {
		if (scrollOffset > layoutHeight() - 500 && productsList && productsList?.length > 40) {
			if (!offsetLoading) setPage(page + 1);
			setOffsetLoading(true);
		}
	}, [scrollOffset]);

	useEffect(() => {
		if (offsetLoading && productsList && totalProductsCount > productsList?.length)
			getProductsOffset(page, () => setOffsetLoading(false));
	}, [offsetLoading]);

	return (
		<AppWrapper
			{...props}
			routeName={t<string>(`shopCategories.${category}`)}
			isLoading={isLoading}
			customPadding="0 0"
			stopSwipe={Platform.OS === 'ios'}
		>
			<StyledListHeaderWrapper onPress={() => setExpandedList(!expandedList!)}>
				<StyledListHeader>
					{t('general.promotionProducts')} {totalPromotionsCount}
				</StyledListHeader>
				<Icon name={expandedList ? 'angle-up' : 'angle-down'} size={16} variant="black" />
			</StyledListHeaderWrapper>

			{expandedList && (
				<FlatList
					columnWrapperStyle={{ justifyContent: 'space-evenly' }}
					ItemSeparatorComponent={() => <View style={{ height: 20, width: 16 }} />}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					contentContainerStyle={styles.contentContainer}
					data={lastWeekPromotions}
					numColumns={2}
					renderItem={({ item }) => <Product {...item} />}
					keyExtractor={(item) => item?.id}
					onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
					getItemLayout={(data, index) => ({ length: itemElementHeight, offset: itemElementHeight * index, index })}
				/>
			)}

			<StyledListHeaderWrapper onPress={() => setExpandedList(!expandedList)}>
				<StyledListHeader>
					{t('general.restProducts')} {totalProductsCount}
				</StyledListHeader>
				<Icon name={expandedList ? 'angle-up' : 'angle-down'} size={16} variant="black" />
			</StyledListHeaderWrapper>

			{!expandedList && (
				<FlatList
					columnWrapperStyle={{ justifyContent: 'space-evenly' }}
					ItemSeparatorComponent={() => <View style={{ height: 20, width: 16 }} />}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					contentContainerStyle={styles.contentContainer}
					data={productsList}
					numColumns={2}
					renderItem={({ item }) => <Product {...item} />}
					keyExtractor={(item) => item?.id}
					onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
					getItemLayout={(data, index) => ({ length: itemElementHeight, offset: itemElementHeight * index, index })}
				/>
			)}
		</AppWrapper>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		display: 'flex',
		minWidth: '100%',
		justifyContent: 'space-evenly',
		paddingTop: 16,
	},
});
