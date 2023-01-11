import React, { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { t } from 'i18next';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { Icon, Input, Loader } from 'components/layout/common';
import { Item } from 'components/lists/partials';

// STYLES
import { StyledAddItemButton, StyledAddNewItem, StyledSortedCategoryTitle } from 'components/lists/elements/Styles';
import { StyledEditInoutWrapper, StyledItemsWrapper } from 'components/lists/partials/Styles';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';
import { ListItemInterface } from 'components/lists/models/partials';

export const ListItems = ({ listItems, bottomSheetHeight }: ListItemInterface) => {
	const { singleListEditable, addNewListItem, addNewSingleListItem, addNewListItemLoader, sortedListItemsByCategories } =
		useContext(ListsContextData);

	return (
		<>
			{sortedListItemsByCategories?.length > 0 ? (
				<View>
					<StyledAddNewItem>
						<Input
							value={singleListEditable?.value?.newItem.value!}
							name="title"
							placeholder={t('general.add')}
							textContentType="nickname"
							// onKeyPress={(e) => e.nativeEvent?.key === 'Enter' && addNewSingleListItem()}
							onChange={(text) => addNewListItem(text)}
						/>

						{addNewListItemLoader ? (
							<StyledAddItemButton onPress={() => {}}>
								<Loader size={20} />
							</StyledAddItemButton>
						) : (
							<StyledAddItemButton onPress={() => addNewSingleListItem()}>
								<Icon name="plus" size={20} />
							</StyledAddItemButton>
						)}
					</StyledAddNewItem>

					<ScrollView>
						{sortedListItemsByCategories?.map((item: any) => (
							<View key={item?.category}>
								<StyledSortedCategoryTitle>{item?.category}</StyledSortedCategoryTitle>
								{item?.items?.map((newItem: ItemInterface) => (
									<Item key={newItem?.id} {...newItem} />
								))}
							</View>
						))}
					</ScrollView>
				</View>
			) : (
				<StyledEditInoutWrapper>
					<StyledAddNewItem>
						<Input
							value={singleListEditable?.value?.newItem.value!}
							name="title"
							placeholder={t('general.add')}
							textContentType="nickname"
							// onKeyPress={(e) => e.nativeEvent?.key === 'Enter' && addNewSingleListItem()}
							onChange={(text) => addNewListItem(text)}
						/>

						{addNewListItemLoader ? (
							<StyledAddItemButton onPress={() => {}}>
								<Loader size={20} />
							</StyledAddItemButton>
						) : (
							<StyledAddItemButton onPress={() => addNewSingleListItem()}>
								<Icon name="plus" size={20} />
							</StyledAddItemButton>
						)}
					</StyledAddNewItem>

					<StyledItemsWrapper bottomSheetHeight={bottomSheetHeight}>
						{listItems?.map((item: ItemInterface) => (
							<Item key={item?.id} {...item} withCategories={item?.category !== null ?? true} />
						))}
					</StyledItemsWrapper>
				</StyledEditInoutWrapper>
			)}
		</>
	);
};
