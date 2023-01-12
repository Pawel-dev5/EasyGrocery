import React, { useState, useContext } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';

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
	StyledItemButton,
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
			<StyledListItemsWrapper>
				<StyledItemTitleWrapper>
					<StyledCheckButton
						onPress={() => {
							setDoneLoading(true);
							updateSingleListItemStatus(id, () => setDoneLoading(false));
						}}
						disabled={doneLoading}
					>
						{doneLoading ? (
							<Loader size={32} />
						) : (
							<Icon variant={done ? 'done' : 'unDone'} name={done ? 'check-circle' : 'circle'} size={30} />
						)}
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
						<StyledItemButton
							onPress={() => {
								setEditLoading(true);

								if (value === editableItem?.title && category === editableItem?.category) {
									setEditLoading(false);
									setEditableItem(null);
									return null;
								}
								updateSingleListItemName(id, editableItem, () => {
									setEditableItem(null);
									setEditLoading(false);
								});
								return null;
							}}
							disabled={editLoading}
						>
							{editLoading ? <Loader size={20} /> : <Icon name="check" size={20} />}
						</StyledItemButton>
					) : (
						<StyledItemButton onPress={() => setEditableItem({ title: value, category })}>
							<Icon name="edit" size={20} />
						</StyledItemButton>
					)}
					<StyledItemButton
						onPress={() => {
							setTrashLoading(true);
							deleteSingleListItem(id, () => setTrashLoading(false));
						}}
						disabled={trashLoading}
					>
						{trashLoading ? <Loader size={20} /> : <Icon name="trash" variant="unDone" size={20} />}
					</StyledItemButton>
				</StyledListItemsOptions>
			</StyledListItemsWrapper>

			{withCategories && <StyledCategory>{editableItem?.category || category}</StyledCategory>}

			{editableItem !== null && categories && categories?.length > 0 && (
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				<ScrollView contentContainerStyle={styles.scrollView} horizontal>
					{categories?.map(({ id: catId, value: catValue }) => (
						<StyledItemsCategory
							key={catId}
							onPress={() => setEditableItem({ ...editableItem, category: catValue })}
							active={(catValue === category && editableItem === null) || editableItem?.category === catValue}
						>
							<Text>{catValue}</Text>
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
