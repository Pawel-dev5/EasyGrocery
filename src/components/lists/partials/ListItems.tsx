import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { Icon, Input } from 'components/layout/common';
import { Item } from 'components/lists/elements';

// STYLES
import { StyledAddItemButton, StyledAddNewItem, StyledSortedCategoryTitle } from 'components/lists/items/Styles';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';
import { StyledEditInoutWrapper } from 'components/lists/elements/Styles';
import { ListItemInterface } from 'components/lists/models/partials';

export const ListItems = ({ listItems }: ListItemInterface) => {
	const { singleListEditable, addNewListItem, addNewSingleListItem, sortedListItemsByCategories } =
		useContext(ListsContextData);
	return (
		<>
			{sortedListItemsByCategories?.length > 0 ? (
				<ScrollView>
					{sortedListItemsByCategories?.map((item: any) => (
						<View key={item?.category}>
							<StyledSortedCategoryTitle>{item?.category}</StyledSortedCategoryTitle>
							{item?.items?.map((item: ItemInterface) => (
								<Item key={item?.id} {...item} />
							))}
						</View>
					))}
				</ScrollView>
			) : (
				<StyledEditInoutWrapper>
					<StyledAddNewItem>
						<Input
							value={singleListEditable?.value?.newItem.value!}
							name="title"
							placeholder="Add"
							textContentType="nickname"
							onKeyPress={(e) => e.nativeEvent?.key === 'Enter' && addNewSingleListItem()}
							onChange={(text) => addNewListItem(text)}
						/>

						<StyledAddItemButton onPress={() => addNewSingleListItem()}>
							<Icon name="plus" size={20} />
						</StyledAddItemButton>
					</StyledAddNewItem>

					<ScrollView>
						{listItems?.map((item: ItemInterface) => (
							<Item key={item?.id} {...item} withCategories />
						))}
					</ScrollView>
				</StyledEditInoutWrapper>
			)}
		</>
	);
};
