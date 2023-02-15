import React, { useContext, useRef } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
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
	const { singleListItemsEditable, inputHandler, addSingleListItem, addNewListItemLoader, sortedListItemsByCategories } =
		useContext(ListsContextData);

	const ref = useRef<TextInput>(null);

	const handleSubmit = () => {
		addSingleListItem();
		ref?.current?.focus();
	};

	const addInput = () => (
		<StyledAddNewItem>
			<Input
				inputRef={ref}
				value={singleListItemsEditable?.value?.newItem.title!}
				name="title"
				placeholder={t('general.add')}
				textContentType="nickname"
				onSubmitEditing={() => handleSubmit()}
				onChange={(text) => inputHandler(text)}
				blurOnSubmit={false}
			/>

			<StyledAddItemButton onPress={() => handleSubmit()} disabled={addNewListItemLoader}>
				{addNewListItemLoader ? <Loader size={25} /> : <Icon name="plus" size={20} />}
			</StyledAddItemButton>
		</StyledAddNewItem>
	);

	return (
		<>
			{sortedListItemsByCategories?.length > 0 ? (
				<View>
					{addInput()}

					<ScrollView keyboardShouldPersistTaps="always">
						{sortedListItemsByCategories?.map((item: any) => (
							<View key={item?.category}>
								<StyledSortedCategoryTitle>{t<string>(`shopCategories.${item?.category}`)}</StyledSortedCategoryTitle>
								{item?.items?.map((newItem: ItemInterface) => (
									<Item key={newItem?.id} {...newItem} />
								))}
							</View>
						))}
					</ScrollView>
				</View>
			) : (
				<StyledEditInoutWrapper>
					{addInput()}

					<StyledItemsWrapper keyboardShouldPersistTaps="always" bottomSheetHeight={bottomSheetHeight}>
						{listItems?.map((item: ItemInterface) => (
							<Item key={item?.id} {...item} />
						))}
					</StyledItemsWrapper>
				</StyledEditInoutWrapper>
			)}
		</>
	);
};
