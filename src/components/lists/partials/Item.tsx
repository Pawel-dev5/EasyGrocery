import React, { useState, useContext } from 'react';
import { TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { Icon, Input, Loader } from 'components/layout/common';

// STYLES
import {
	StyledItemTitle,
	StyledItemTitleWrapper,
	StyledListItemsOptions,
	StyledListItemsWrapper,
	StyledCategory,
	StyledItemsCategory,
	StyledItemsContainer,
	StyledCheckButton,
	StyledEditInputWrapper,
} from 'components/lists/partials/Styles';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';
import { EditItemInterface } from 'components/lists/models/elements';

export const Item = ({ id, value, done, category, withCategories }: ItemInterface) => {
	const [editableItem, setEditableItem] = useState<EditItemInterface | null>(null);
	const { updateSingleListItemName, deleteSingleListItem, updateSingleListItemStatus, singleList } =
		useContext(ListsContextData);

	// LOADERS STATES
	const [doneLoading, setDoneLoading] = useState(false);
	const [trashLoading, setTrashLoading] = useState(false);
	const [editLoading, setEditLoading] = useState(false);

	const categories = singleList?.shop?.data?.attributes?.orders;

	return (
		<StyledItemsContainer>
			<StyledListItemsWrapper key={id}>
				<StyledItemTitleWrapper>
					<StyledCheckButton
						onPress={() => {
							setDoneLoading(true);
							updateSingleListItemStatus(id, () => setDoneLoading(false));
						}}
					>
						{doneLoading ? <Loader size={30} /> : <Icon variant={done ? 'done' : 'unDone'} name="check-circle" size={30} />}
					</StyledCheckButton>

					{editableItem !== null ? (
						<StyledEditInputWrapper>
							<Input
								value={editableItem.title!}
								name="title"
								placeholder="title"
								textContentType="nickname"
								onChange={(text) => setEditableItem({ ...editableItem, title: text as unknown as string })}
							/>
						</StyledEditInputWrapper>
					) : (
						<StyledItemTitle>{value}</StyledItemTitle>
					)}
				</StyledItemTitleWrapper>

				<StyledListItemsOptions>
					{editableItem !== null ? (
						<TouchableOpacity
							onPress={() => {
								setEditLoading(true);
								updateSingleListItemName(id, editableItem, () => {
									setEditableItem(null);
									setEditLoading(false);
								});
							}}
						>
							{editLoading ? <Loader size={15} /> : <Icon name="check" size={20} />}
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={() => setEditableItem({ title: value, category })}>
							<Icon name="edit" size={20} />
						</TouchableOpacity>
					)}
					<TouchableOpacity
						onPress={() => {
							setTrashLoading(true);
							deleteSingleListItem(id, () => setTrashLoading(false));
						}}
					>
						{trashLoading ? <Loader size={20} /> : <Icon name="trash" size={20} />}
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

			{withCategories && <StyledCategory>{category}</StyledCategory>}
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
