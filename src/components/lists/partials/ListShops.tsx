import React, { useContext } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// MODELS
import { ShopsContextData } from 'components/shops/hooks/useShops';
import { StyledListShopCategories, StyledShopImage } from 'components/lists/partials/Styles';

export const ListShops = () => {
	const { editedSingleList, setNewShop, newShop } = useContext(ListsContextData);

	const { shops } = useContext(ShopsContextData);

	return (
		<>
			<ScrollView contentContainerStyle={styles.scrollView} horizontal>
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
					};
					return (
						<TouchableOpacity key={shop?.id} onPress={() => setNewShop(shop)}>
							<StyledShopImage
								source={{ uri: shop?.attributes?.image?.data?.attributes?.url }}
								style={[{ resizeMode: 'contain' }, isActiveShop()]}
							/>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
			<View>
				{newShop !== null && (
					<View>
						{newShop?.attributes?.orders?.map(({ id, value }) => (
							<StyledListShopCategories key={id}>{value}</StyledListShopCategories>
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
