/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, RefreshControl, FlatList, Platform, StyleSheet, Pressable } from 'react-native';
import { t } from 'i18next';

// ROUTER
import { shops as shopsRoutes } from 'routes/AppRoutes';

// REDUX
import { selectShops } from 'redux/slices/shops';
import { useAppSelector } from 'redux/hooks';
import { selectLists } from 'redux/slices/lists';

// HOOKS
import { useProductsList } from 'components/shops/hooks/useProductsList';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { BottomSheetRenderItem, Product } from 'components/shops/sections';
import { Icon } from 'components/layout/common';

// STYLES
import {
	StyledListHeaderWrapper,
	StyledListHeader,
	StyledCategoryWrapper,
	StyledListSeparator,
	StyledCategoryText,
} from 'components/shops/views/Styles';

// MODELS
import { BottomSheetInterface } from 'components/shops/models/views';

export const ProductsList = (props: any) => {
	const {
		route: {
			params: { slug, category },
		},
		navigation,
	} = props;

	const shopState = useAppSelector(selectShops);
	const listsState = useAppSelector(selectLists);
	const { shop } = shopState;
	const { lists } = listsState;

	const {
		isLoading,
		productsList,
		lastWeekPromotions,
		totalProductsCount,
		totalPromotionsCount,
		getProducts,
		getProductsOffset,
		addProductToList,
	} = useProductsList({
		url: slug,
		category,
	});

	const initialBottomSheetState = { visible: false, product: null };

	const [bottomSheetState, setBottomSheetState] = useState<BottomSheetInterface>(initialBottomSheetState);
	const [refreshing, setRefreshing] = useState(false);
	const [scrollOffset, setScrollOffset] = useState(0);
	const [offsetLoading, setOffsetLoading] = useState(false);
	// IF TRUE SHOW PROMOTION IF FALSE SHOW REST AND IF PROMOTION === 0 SHOW REST
	const [expandedList, setExpandedList] = useState(!!(lastWeekPromotions && lastWeekPromotions?.length === 0));
	const [page, setPage] = useState(1);

	const flatList = useRef<FlatList>(null);

	const itemElementHeight = 150;
	const index = shop?.attributes?.orders?.findIndex((element) => element?.value === category);

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
	}, [category]);

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
			searchActive
			onClose={() => setBottomSheetState(initialBottomSheetState)}
			visible={bottomSheetState?.visible}
			bottomSheetHeader="general.chooseList"
			bottomSheet={
				<FlatList
					style={{ height: '100%' }}
					ItemSeparatorComponent={() => <StyledListSeparator />}
					contentContainerStyle={styles.bottomSheetBody}
					data={lists}
					renderItem={({ item }) => (
						<BottomSheetRenderItem item={item} bottomSheetState={bottomSheetState} addProductToList={addProductToList} />
					)}
					keyExtractor={(item) => item?.id}
				/>
			}
		>
			<FlatList
				ref={flatList}
				initialScrollIndex={index}
				initialNumToRender={shop?.attributes?.orders?.length}
				onScrollToIndexFailed={(info) => {
					// eslint-disable-next-line no-promise-executor-return
					const wait = new Promise((resolve) => setTimeout(resolve, 500));
					if (info.index)
						wait.then(() => {
							flatList.current?.scrollToIndex({ index: info.index, animated: true });
						});
				}}
				contentContainerStyle={styles.categoriesContainer}
				horizontal
				ItemSeparatorComponent={() => <View style={{ height: 10, width: 8 }} />}
				data={shop?.attributes?.orders}
				renderItem={({ item }) => (
					<Pressable
						key={item?.id}
						onPress={() =>
							navigation?.navigate(shopsRoutes.productsList, {
								id: shop?.id,
								slug: shop?.attributes?.apiUrl,
								category: item?.value,
							})
						}
					>
						<StyledCategoryWrapper active={category === item?.value}>
							<StyledCategoryText active={category === item?.value}>
								{t<string>(`shopCategories.${item?.value}`)}
							</StyledCategoryText>
						</StyledCategoryWrapper>
					</Pressable>
				)}
				keyExtractor={(item) => item?.id}
			/>
			{lastWeekPromotions && lastWeekPromotions?.length > 0 && (
				<>
					<StyledListHeaderWrapper onPress={() => setExpandedList(!expandedList!)}>
						<StyledListHeader>
							{t('general.promotionProducts')} {totalPromotionsCount}
						</StyledListHeader>
						<Icon name={expandedList ? 'angle-up' : 'angle-down'} size={16} variant="black" />
					</StyledListHeaderWrapper>

					{expandedList && (
						<FlatList
							style={{ height: '100%', paddingLeft: '7%', paddingRight: '7%' }}
							columnWrapperStyle={{ justifyContent: 'space-between' }}
							ItemSeparatorComponent={() => <View style={{ height: 20, width: 16 }} />}
							refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
							contentContainerStyle={styles.contentContainer}
							data={lastWeekPromotions}
							numColumns={2}
							renderItem={({ item }) => <Product {...item} setBottomSheetState={setBottomSheetState} />}
							keyExtractor={(item) => item?.id}
							onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
						/>
					)}
				</>
			)}

			<StyledListHeaderWrapper
				onPress={() => lastWeekPromotions && lastWeekPromotions?.length > 0 && setExpandedList(!expandedList)}
			>
				<StyledListHeader>
					{t('general.restProducts')} {totalProductsCount}
				</StyledListHeader>

				{lastWeekPromotions && lastWeekPromotions?.length > 0 && (
					<Icon name={expandedList ? 'angle-up' : 'angle-down'} size={16} variant="black" />
				)}
			</StyledListHeaderWrapper>

			{!expandedList && (
				<FlatList
					style={{ height: '100%' }}
					columnWrapperStyle={{ justifyContent: 'space-evenly' }}
					ItemSeparatorComponent={() => <View style={{ height: 20, width: 16 }} />}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					contentContainerStyle={styles.contentContainer}
					data={productsList}
					numColumns={2}
					renderItem={({ item }) => <Product {...item} setBottomSheetState={setBottomSheetState} />}
					keyExtractor={(item) => item?.id}
					onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
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
	categoriesContainer: {
		paddingBottom: 20,
		paddingLeft: 16,
		justifyContent: 'space-evenly',
	},
	bottomSheetBody: {
		display: 'flex',
		minWidth: '100%',
		justifyContent: 'space-evenly',
		paddingTop: 16,
		paddingLeft: 8,
		paddingRight: 8,
	},
});
