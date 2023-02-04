import React, { useCallback, useEffect, useState } from 'react';
import { Text, RefreshControl, FlatList } from 'react-native';

// HOOKS
import { useProductsList } from 'components/shops/hooks/useProductsList';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { Product } from 'components/shops/sections';

export const ProductsList = (props: any) => {
	const {
		route: {
			params: { slug, category },
		},
	} = props;

	const { isLoading, productsList, totalProductsCount, getProducts, getProductsOffset } = useProductsList({
		url: slug,
		category,
	});

	const [refreshing, setRefreshing] = useState(false);
	const [scrollOffset, setScrollOffset] = useState(0);
	const [offsetLoading, setOffsetLoading] = useState(false);
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
		<AppWrapper {...props} routeName={category} isLoading={isLoading} customPadding="0 0">
			<Text>Wszystkie produkty:</Text>
			<Text>{totalProductsCount}</Text>

			<FlatList
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				contentContainerStyle={{ width: '100%' }}
				data={productsList}
				renderItem={({ item }) => <Product {...item} />}
				keyExtractor={(item) => item?.id}
				onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
				getItemLayout={(data, index) => ({ length: itemElementHeight, offset: itemElementHeight * index, index })}
			/>
		</AppWrapper>
	);
};
