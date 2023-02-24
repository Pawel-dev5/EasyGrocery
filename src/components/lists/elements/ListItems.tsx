import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import DraggableFlatList, { OpacityDecorator, RenderItemParams } from 'react-native-draggable-flatlist';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { Item } from 'components/lists/partials';
import { ExpandableList } from 'components/layout/common/expandableListView';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';
import { ListItemInterface } from 'components/lists/models/partials';

export const ListItems = ({ listItems, bottomSheetHeight }: ListItemInterface) => {
	const { itemsDnDUpdate, sortedListItemsByCategories } = useContext(ListsContextData);

	return (
		<>
			{sortedListItemsByCategories?.length > 0 ? (
				<ExpandableList data={sortedListItemsByCategories} bottomSheetHeight={bottomSheetHeight} />
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
