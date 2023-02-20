import React, { useContext, useRef } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { t } from 'i18next';
import DraggableFlatList, { OpacityDecorator, RenderItemParams } from 'react-native-draggable-flatlist';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { Icon, Input, Loader } from 'components/layout/common';
import { Item } from 'components/lists/partials';

// STYLES
import { StyledAddItemButton, StyledAddNewItem, StyledSortedCategoryTitle } from 'components/lists/elements/Styles';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';
import { ListItemInterface } from 'components/lists/models/partials';

export const ListItems = ({ listItems, bottomSheetHeight }: ListItemInterface) => {
	const {
		singleListItemsEditable,
		inputHandler,
		addSingleListItem,
		itemsDnDUpdate,
		addNewListItemLoader,
		sortedListItemsByCategories,
	} = useContext(ListsContextData);

	const ref = useRef<TextInput>(null);

	const handleSubmit = () => {
		addSingleListItem();
		ref?.current?.focus();
	};

	const addInput = () => (
		<StyledAddNewItem>
			<Input
				inputRef={ref}
				value={singleListItemsEditable?.value?.newItem.title || ''}
				name="title"
				placeholder={t<string>('general.add')}
				textContentType="nickname"
				onSubmitEditing={() => handleSubmit()}
				onChangeText={(text) => inputHandler(text)}
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
				<>
					{listItems && listItems?.length > 0 && (
						<DraggableFlatList
							data={listItems}
							onDragEnd={({ data }: { data: ItemInterface[] }) => itemsDnDUpdate(data)}
							style={{
								maxHeight: '100%',
								height: bottomSheetHeight === 1 ? '77%' : '100%',
								paddingRight: 15,
								paddingLeft: 15,
							}}
							keyExtractor={(item: ItemInterface) => item?.id}
							renderItem={({ item, drag, isActive, getIndex }: RenderItemParams<ItemInterface>) => {
								const newProps = {
									...item,
									index: getIndex()!,
								};
								return (
									<OpacityDecorator>
										<TouchableOpacity onLongPress={drag} disabled={isActive}>
											<Item {...newProps} />
										</TouchableOpacity>
									</OpacityDecorator>
								);
							}}
						/>
					)}
				</>
			)}
		</>
	);
};
