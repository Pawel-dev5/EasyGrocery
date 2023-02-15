import React, { useContext } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';
import { t } from 'i18next';

// REDUX
import { selectShops } from 'redux/slices/shops';
import { useAppSelector } from 'redux/hooks';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// MODELS
import { StyledListShopCategories, StyledShopImage } from 'components/lists/partials/Styles';

export const ListShops = () => {
	const shopState = useAppSelector(selectShops);
	const { shops } = shopState;
	const { editedSingleList, setNewShop, newShop } = useContext(ListsContextData);

	return (
		<>
			{/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
			<ScrollView contentContainerStyle={styles?.scrollView} horizontal>
				{shops?.map((shop) => {
					const isActiveShop = () => {
						if (shop?.id === newShop?.id)
							return {
								transform: [{ scale: 1.12 }],
							};
						if (shop?.id === editedSingleList?.shop?.data?.id && newShop === null)
							return {
								transform: [{ scale: 1.12 }],
							};
						return null;
					};
					return (
						<TouchableOpacity key={shop?.id} onPress={() => setNewShop(shop)}>
							<StyledShopImage
								source={{ uri: shop?.attributes?.image?.data?.attributes?.url }}
								style={[{ resizeMode: 'cover' }, isActiveShop()]}
							/>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
			<View>
				{newShop !== null && (
					<View>
						{newShop?.attributes?.orders?.map(({ id, value }) => (
							<StyledListShopCategories key={id}>{t<string>(`shopCategories.${value}`)}</StyledListShopCategories>
						))}
					</View>
				)}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		minWidth: '100%',
		paddingVertical: 8,
		paddingHorizontal: 5,
	},
});
