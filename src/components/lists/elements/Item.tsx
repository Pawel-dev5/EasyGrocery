import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, Text, ScrollView, StyleSheet } from 'react-native';

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
	StyledCategory,
	StyledItemsCategory,
	StyledEditInoutWrapper,
	StyledItemsContainer,
} from 'components/lists/elements/Styles';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';
import { EditItemInterface } from 'components/lists/models/elements';

export const Item = ({ id, value, done, category, withCategories }: ItemInterface) => {
	const [editableItem, setEditableItem] = useState<EditItemInterface | null>(null);
	const { updateSingleListItemName, deleteSingleListItem, updateSingleListItemStatus, singleList } =
		useContext(ListsContextData);

	const categories = singleList?.shop?.data?.attributes?.orders;
	return (
		<StyledItemsContainer>
			<StyledListItemsWrapper key={id}>
				<StyledItemTitleWrapper>
					<TouchableOpacity onPress={() => updateSingleListItemStatus(id)}>
						<Icon variant={done ? 'done' : 'unDone'} name="check-circle" size={30} />
					</TouchableOpacity>

					{editableItem !== null ? (
						<StyledEditInoutWrapper>
							<Input
								value={editableItem.title!}
								name="title"
								placeholder="title"
								textContentType="nickname"
								onChange={(text) => setEditableItem({ ...editableItem, title: text as unknown as string })}
							/>
						</StyledEditInoutWrapper>
					) : (
						<View>
							<StyledItemTitle>{value}</StyledItemTitle>
							{withCategories && <StyledCategory>{category}</StyledCategory>}
						</View>
					)}
				</StyledItemTitleWrapper>

				<StyledListItemsOptions>
					{editableItem !== null ? (
						<TouchableOpacity
							onPress={() => {
								updateSingleListItemName(id, editableItem);
								setEditableItem(null);
							}}
						>
							<Icon name="check" size={20} />
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={() => setEditableItem({ title: value, category })}>
							<Icon name="edit" size={20} />
						</TouchableOpacity>
					)}
					<TouchableOpacity onPress={() => deleteSingleListItem(id)}>
						<Icon name="trash" size={20} />
					</TouchableOpacity>
				</StyledListItemsOptions>
			</StyledListItemsWrapper>

			{editableItem !== null && categories && categories?.length > 0 && (
				<ScrollView contentContainerStyle={styles.scrollView} horizontal>
					{categories?.map(({ id, value }) => (
						<StyledItemsCategory
							key={id}
							onPress={() => setEditableItem({ ...editableItem, category: value })}
							active={(value === category && editableItem === null) || editableItem?.category === value}
						>
							<Text>{value}</Text>
						</StyledItemsCategory>
					))}
				</ScrollView>
			)}
		</StyledItemsContainer>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		minWidth: '100%',
		justifyContent: 'space-between',
		paddingVertical: 16,
	},
});
