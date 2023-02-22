import React, { useEffect } from 'react';
import { Text, View, Dimensions, Image, FlatList, Pressable } from 'react-native';
import { t } from 'i18next';
import { LineChart } from 'react-native-chart-kit';

// ROUTER
import { product } from 'routes/AppRoutes';

// REDUX
import { useAppSelector } from 'redux/hooks';
import { selectProduct } from 'redux/slices/product';

// HOOKS
import { useProductsList } from 'components/shops/hooks/useProductsList';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { ProductCard } from 'components/product/sections';

// STYLES
import { ProductSimilarItemsInlineStyle } from 'components/product/views/Styles';

export const Product = (props: any) => {
	const productState = useAppSelector(selectProduct);
	const { data } = productState;
	const {
		route: {
			params: { shop, category },
		},
		navigation,
	} = props;

	const { getProductSimilarItems, similarProductsList } = useProductsList({
		url: shop,
		category,
	});

	const last30DaysData = () => {
		const pricesArray: number[] = [];
		const titlesArray: string[] = [];

		data?.prices?.forEach((price, index) => {
			const priceAsNumber = price.price?.replace(' zł', '')?.replace(',', '.')?.trim();
			pricesArray.push(Number(priceAsNumber));
			if (index % 2 === 0) titlesArray.push(price?.date);
		});

		pricesArray.reverse();
		titlesArray.reverse();
		return { pricesArray, titlesArray };
	};

	useEffect(() => {
		// eslint-disable-next-line no-useless-escape
		const regExTitle = data?.title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')?.split(' ');
		const newArr: string[] = [];
		if (regExTitle && regExTitle?.length > 0) {
			regExTitle?.forEach((element) => {
				if (element.length > 1) newArr.push(element);
			});
		}

		if (newArr.length > 0) getProductSimilarItems(newArr);
	}, []);

	return (
		<AppWrapper {...props} stopSwipe routeName={t(`shopCategories.${category}`)}>
			<View>
				<View>
					{data?.imageUrl && <Image source={{ uri: data?.imageUrl }} style={{ width: 100, height: 100 }} />}
					<Text>{data?.title}</Text>
				</View>

				<View>
					<Text>Cena:</Text>
					<Text>30dni</Text>
				</View>

				<LineChart
					data={{
						labels: last30DaysData()?.titlesArray,
						datasets: [
							{
								data: last30DaysData()?.pricesArray,
								strokeWidth: 2,
							},
						],
					}}
					width={Dimensions.get('window').width - 16}
					height={220}
					chartConfig={{
						backgroundColor: '#1cc910',
						backgroundGradientFrom: '#eff3ff',
						backgroundGradientTo: '#efefef',
						decimalPlaces: 2,
						color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
						style: {
							borderRadius: 16,
						},
					}}
					style={{
						marginVertical: 8,
						borderRadius: 16,
					}}
					fromZero
					bezier
					onDataPointClick={(pointData) => console.log(pointData)}
					yAxisSuffix=" zł"
				/>

				<Text>Podobne produkty:</Text>
				<FlatList
					contentContainerStyle={ProductSimilarItemsInlineStyle?.categoriesContainer}
					horizontal
					data={similarProductsList}
					ItemSeparatorComponent={() => <View style={{ height: 10, width: 16 }} />}
					renderItem={({ item }) => (
						<Pressable
							style={{ width: 180, height: 200 }}
							key={item?.id}
							onPress={() => navigation?.navigate(product.product, { shop, category, slug: item?.title })}
						>
							<ProductCard
								{...item}
								navigation={navigation}
								getProductSimilarItems={getProductSimilarItems}
								shopSlug={shop}
							/>
						</Pressable>
					)}
					keyExtractor={(item) => item?.id}
				/>
			</View>
		</AppWrapper>
	);
};
