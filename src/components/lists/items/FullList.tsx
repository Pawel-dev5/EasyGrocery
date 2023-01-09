import React, { useContext, useEffect, useRef, useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { t } from 'i18next';
import BottomSheet from '@gorhom/bottom-sheet';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';
import { ContextProvider as ShopContextProvider, ShopsContextData } from 'components/shops/hooks/useShops';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { Icon, ProgressBar } from 'components/layout/common';
import { SubmitAlert } from 'components/lists/partials';
import { ListItems, EditListForm } from 'components/lists/elements';

// STYLES
import {
	StyledActionButton,
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
} from 'components/lists/items/Styles';

// MODELS
import { FullListInterface } from 'components/lists/models/items';

export const FullListWrapper = (props: any, { actualList, setLists }: FullListInterface) => {
	const {
		singleList,
		getList,
		deleteList,
		clearSingleListItems,
		setShowDone,
		filteredItems,
		showDone,
		editedSingleList,
		setEditedSingleList,
		sortItemsByCategories,
		sortedListItemsByCategories,
		setSortedListItemsByCategories,
		isLoading,
		setIsLoading,
	} = useContext(ListsContextData);
	const { getShops, shops } = useContext(ShopsContextData);

	const listUuid = props?.route?.params?.id;

	useEffect(() => {
		if (listUuid) {
			setIsLoading(true);
			getList(listUuid);
			if (shops?.length === 0) getShops();
		}
	}, []);

	// BOTTOMSHEET CONFIG
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['75%', '75%', '99.9%'], []);

	const listItems = filteredItems || singleList?.items;

	return (
		<>
			<AppWrapper {...props} isLoading={isLoading} routeName={singleList?.title || t('general.myLists')} customPadding="0">
				<StyledListBackground color={singleList?.color!}>
					<StyledFullListWrapper>
						<StyledInputTitleWrapper>
							<StyledListTitle>{singleList?.title}</StyledListTitle>

							<StyledListOptionWrapper>
								<StyledActionButton onPress={() => setEditedSingleList(editedSingleList === null ? singleList : null)}>
									<Icon name={editedSingleList !== null ? 'list' : 'edit'} size={20} />
								</StyledActionButton>

								<StyledActionButton
									onPress={() =>
										SubmitAlert({
											okPressed: () => clearSingleListItems(),
											okText: t('general.delete'),
											cancelText: t('general.cancel'),
											cancelPressed: () => {},
											alertTitle: singleList?.title ?? '',
											alertMessage: t<string>('general.deleteAllItems'),
										})
									}
								>
									<Icon name="broom" size={20} />
								</StyledActionButton>

								<StyledActionButton
									onPress={() =>
										SubmitAlert({
											okPressed: () => deleteList(singleList?.id!, actualList, setLists, props?.navigation),
											okText: t('general.delete'),
											cancelText: t('general.cancel'),
											cancelPressed: () => {},
											alertTitle: singleList?.title ?? '',
											alertMessage: t<string>('general.deleteList'),
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
								<StyledUsersCounter>{singleList?.users_permissions_users?.data?.length}</StyledUsersCounter>
							</StyledListCardItemElement>
						</StyledUsersWrapper>

						{singleList?.description && <StyledListDescription>{singleList?.description}</StyledListDescription>}

						<ProgressBar items={singleList?.items!} />

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

						{singleList?.shop?.data !== null && (
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

					<BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
						<StyledItemsWrapper>
							{editedSingleList ? <EditListForm /> : <ListItems listItems={listItems!} />}
						</StyledItemsWrapper>
					</BottomSheet>
				</StyledListBackground>
			</AppWrapper>
		</>
	);
};

export const FullList = (props: any) => {
	const { socket, setSocket, lists, setLists } = useContext(GlobalContextData);

	return (
		<ContextProvider socket={socket} setSocket={setSocket} lists={lists} setLists={setLists}>
			<ShopContextProvider>
				<FullListWrapper {...props} />
			</ShopContextProvider>
		</ContextProvider>
	);
};
