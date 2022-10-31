import React, { useState, useContext } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { Icon, Input } from 'components/layout/common';

// STYLES
import {
	StyledItemTitle,
	StyledItemTitleWrapper,
	StyledListItemsOptions,
	StyledListItemsWrapper,
} from 'components/lists/elements/Styles';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';

export const Item = ({ id, value, done }: ItemInterface) => {
	const [editableItem, setEditableItem] = useState<string | null>(null);
	const { editSingleListItems } = useContext(ListsContextData);

	return (
		<ScrollView>
			<StyledListItemsWrapper key={id}>
				<StyledItemTitleWrapper>
					<TouchableOpacity onPress={() => editSingleListItems('updateDone', id)}>
						<Icon variant={done ? 'done' : 'unDone'} name="check-circle" size={30} />
					</TouchableOpacity>

					{editableItem !== null ? (
						<Input
							value={editableItem!}
							name="title"
							placeholder="title"
							textContentType="nickname"
							onChange={(text) => setEditableItem(text as unknown as string)}
						/>
					) : (
						<StyledItemTitle>{value}</StyledItemTitle>
					)}
				</StyledItemTitleWrapper>

				<StyledListItemsOptions>
					{editableItem !== null ? (
						<TouchableOpacity
							onPress={() => {
								editSingleListItems('updateTitle', id, editableItem);
								setEditableItem(null);
							}}
						>
							<Icon name="check" size={20} />
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={() => setEditableItem(value)}>
							<Icon name="edit" size={20} />
						</TouchableOpacity>
					)}
					<TouchableOpacity onPress={() => editSingleListItems('delete', id)}>
						<Icon name="trash" size={20} />
					</TouchableOpacity>
				</StyledListItemsOptions>
			</StyledListItemsWrapper>
		</ScrollView>
	);
};
