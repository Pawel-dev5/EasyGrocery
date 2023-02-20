import React from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// REDUX
import { useAppSelector } from 'redux/hooks';
import { selectProduct } from 'redux/slices/product';

// COMPONENTS
import { AppWrapper } from 'components/layout';

export const Product = (props: any) => {
	const productState = useAppSelector(selectProduct);
	const { data } = productState;

	const chartData = () => {
		const pricesArray: number[] = [];
		const titlesArray: string[] = [];

		data?.prices?.forEach((price) => {
			const tmp = price.price?.replace(' zł', '')?.replace(',', '.')?.trim();
			console.log(price?.date?.slice(5));
			pricesArray.push(Number(tmp));
			titlesArray.push(price?.date?.slice(5));

			pricesArray.push(Number(tmp) + 1.5);
			titlesArray.push(price?.date?.slice(5));
			pricesArray.push(Number(tmp) + 2);
			titlesArray.push(price?.date?.slice(5));
			pricesArray.push(Number(tmp) + 1);
			titlesArray.push(price?.date?.slice(5));
			pricesArray.push(Number(tmp) + 1.5);
			titlesArray.push(price?.date?.slice(5));
		});

		return { pricesArray, titlesArray };
	};
	console.log(data?.imageUrl);
	return (
		<AppWrapper {...props}>
			<View>
				<View>
					{data?.imageUrl && <Image source={{ uri: data?.imageUrl }} style={{ width: 100, height: 100 }} />}
					<Text>{data?.title}</Text>
				</View>

				<LineChart
					data={{
						labels: chartData()?.titlesArray,
						datasets: [
							{
								data: chartData()?.pricesArray,
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
				/>
			</View>
		</AppWrapper>
	);
};
