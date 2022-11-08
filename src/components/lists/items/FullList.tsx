import React, { useContext, useEffect } from 'react';
import { Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { t } from 'i18next';

// CONTEXT
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';
import { GlobalContextData } from 'config/useGlobalContext';
import { ContextProvider as ShopContextProvider, ShopsContextData } from 'components/shops/hooks/useShops';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { Icon, Input, ProgressBar } from 'components/layout/common';
import { EditListForm, Item, SubmitAlert } from 'components/lists/elements';

// STYLES
import {
	StyledActionButton,
	StyledAddItemButton,
	StyledAddNewItem,
	StyledFullListWrapper,
	StyledInputTitleWrapper,
	StyledItemsWrapper,
	StyledListBackground,
	StyledListCardItemElement,
	StyledListOptionWrapper,
	StyledListTitle,
	StyledUsersCounter,
	StyledUsersWrapper,
	StyledListDescription,
	StyledSortedCategoryTitle,
} from 'components/lists/items/Styles';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';
import { StyledEditInoutWrapper } from '../elements/Styles';

export const FullListWrapper = (props: any) => {
	const {
		singleList,
		singleListEditable,
		getList,
		deleteList,
		addNewListItem,
		editSingleListItems,
		setShowDone,
		filteredItems,
		showDone,
		isLoading,
		setIsLoading,
		editedSingleList,
		setEditedSingleList,
		sortItemsByCategories,
		sortedListItemsByCategories,
		setSortedListItemsByCategories,
	} = useContext(ListsContextData);
	const { lang, setLang } = useContext(GlobalContextData);
	const { getShops, shops } = useContext(ShopsContextData);

	const listUuid = props?.route?.params?.id;

	useEffect(() => {
		if (listUuid) {
			setIsLoading(true);
			getList(listUuid);
			if (shops?.length === 0) getShops();
		}
	}, []);

	if (singleList) {
		const { id, title, users_permissions_users, items, description, color, shop } = singleList;
		const listItems = filteredItems || items;

		return (
			<>
				<AppWrapper
					{...props}
					isLoading={isLoading}
					routeName={t('general.myLists')}
					lang={lang}
					setLang={setLang}
					customPadding="0"
				>
					<StyledListBackground color={color}>
						<StyledFullListWrapper>
							<StyledInputTitleWrapper>
								<StyledListTitle>{editedSingleList?.title || title}</StyledListTitle>

								<StyledListOptionWrapper>
									<StyledActionButton onPress={() => setEditedSingleList(editedSingleList === null ? singleList : null)}>
										<Icon name={editedSingleList !== null ? 'list' : 'edit'} size={20} />
									</StyledActionButton>

									<StyledActionButton
										onPress={() =>
											SubmitAlert({
												okPressed: () => editSingleListItems('clear', id!),
												okText: t('general.delete'),
												cancelText: t('general.cancel'),
												cancelPressed: () => {},
												alertTitle: singleList.title ?? '',
												alertMessage: t('general.deleteAllItems'),
											})
										}
									>
										<Icon name="broom" size={20} />
									</StyledActionButton>

									<StyledActionButton
										onPress={() =>
											SubmitAlert({
												okPressed: () => deleteList(id!),
												okText: t('general.delete'),
												cancelText: t('general.cancel'),
												cancelPressed: () => {},
												alertTitle: singleList.title ?? '',
												alertMessage: t('general.deleteList'),
											})
										}
									>
										<Icon name="trash" size={20} />
									</StyledActionButton>
								</StyledListOptionWrapper>
							</StyledInputTitleWrapper>

							<StyledUsersWrapper>
								<StyledListCardItemElement>
									<Icon name="users" size={20} />
								</StyledListCardItemElement>

								<StyledListCardItemElement>
									<StyledUsersCounter>{users_permissions_users?.data?.length}</StyledUsersCounter>
								</StyledListCardItemElement>
							</StyledUsersWrapper>

							{description && <StyledListDescription>{description}</StyledListDescription>}

							<ProgressBar items={items} />

							{(showDone !== 'done' || showDone === null) && (
								<TouchableOpacity onPress={() => setShowDone('done')}>
									<Text>{t<string>('general.showOnlyDone')}</Text>
								</TouchableOpacity>
							)}

							{(showDone !== 'unDone' || showDone === null) && (
								<TouchableOpacity onPress={() => setShowDone('unDone')}>
									<Text>{t<string>('general.showOnlyUnDone')}</Text>
								</TouchableOpacity>
							)}

							{showDone !== null && (
								<TouchableOpacity onPress={() => setShowDone(null)}>
									<Text>{t<string>('general.showAll')}</Text>
								</TouchableOpacity>
							)}

							{shop?.data !== null && (
								<TouchableOpacity
									onPress={() =>
										sortedListItemsByCategories ? setSortedListItemsByCategories(null) : sortItemsByCategories()
									}
								>
									<Text>
										{t<string>(sortedListItemsByCategories ? 'general.backToListView' : 'general.sortByShopCategory')}
									</Text>
								</TouchableOpacity>
							)}
						</StyledFullListWrapper>

						<StyledItemsWrapper>
							{editedSingleList ? (
								<EditListForm />
							) : (
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
													onKeyPress={(e) => console.log(e.nativeEvent)}
													onChange={(text) => addNewListItem(text)}
												/>

												<StyledAddItemButton onPress={() => editSingleListItems('add')}>
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
							)}
						</StyledItemsWrapper>
					</StyledListBackground>
				</AppWrapper>
			</>
		);
	}
	return null;
};

export const FullList = (props: any) => (
	<ContextProvider>
		<ShopContextProvider>
			<FullListWrapper {...props} />
		</ShopContextProvider>
	</ContextProvider>
);
