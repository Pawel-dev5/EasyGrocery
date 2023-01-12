import React, { useContext, useEffect, useRef, useMemo, useCallback, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { t } from 'i18next';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

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
	StyledListBackground,
	StyledListCardItemElement,
	StyledListOptionWrapper,
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
		setEditedSingleList,
		sortItemsByCategories,
		setSortedListItemsByCategories,
		setIsLoading,
		filteredItems,
		showDone,
		editedSingleList,
		sortedListItemsByCategories,
		isLoading,
	} = useContext(ListsContextData);
	const { getShops, shops } = useContext(ShopsContextData);

	const [bottomSheetHeight, setBottomSheetHeight] = useState(1);
	const [newColor, setNewColor] = useState<string | null>(null);

	const { route, navigation } = props;
	const listUuid = route?.params?.id;

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
	const handleSheetChanges = useCallback((index: number) => setBottomSheetHeight(index), []);

	const listItems = filteredItems || singleList?.items;

	return (
		<AppWrapper {...props} isLoading={isLoading} routeName={singleList?.title || t('general.myLists')} customPadding="0">
			<StyledListBackground color={newColor || singleList?.color!}>
				<StyledFullListWrapper>
					<StyledInputTitleWrapper>
						<StyledUsersWrapper>
							<StyledListCardItemElement>
								<Icon name="users" size={20} />
							</StyledListCardItemElement>

							<StyledListCardItemElement>
								<StyledUsersCounter>{singleList?.users_permissions_users?.data?.length}</StyledUsersCounter>
							</StyledListCardItemElement>
						</StyledUsersWrapper>

						<StyledListOptionWrapper>
							<StyledActionButton onPress={() => setEditedSingleList(editedSingleList === null ? singleList : null)}>
								<Icon name={editedSingleList !== null ? 'list' : 'edit'} size={20} />
							</StyledActionButton>

							{listItems && listItems?.length > 0 && (
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
							)}

							<StyledActionButton
								onPress={() =>
									SubmitAlert({
										okPressed: () => deleteList(singleList?.id!, actualList, setLists, navigation),
										okText: t('general.delete'),
										cancelText: t('general.cancel'),
										cancelPressed: () => {},
										alertTitle: singleList?.title ?? '',
										alertMessage: t<string>('general.deleteList'),
									})
								}
							>
								<Icon name="trash" size={20} variant="unDone" />
							</StyledActionButton>
						</StyledListOptionWrapper>
					</StyledInputTitleWrapper>

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
							onPress={() => (sortedListItemsByCategories ? setSortedListItemsByCategories(null) : sortItemsByCategories())}
						>
							<Text>{t<string>(sortedListItemsByCategories ? 'general.backToListView' : 'general.sortByShopCategory')}</Text>
						</TouchableOpacity>
					)}
				</StyledFullListWrapper>

				<BottomSheet
					ref={bottomSheetRef}
					index={1}
					snapPoints={snapPoints}
					enableContentPanningGesture={false}
					onChange={handleSheetChanges}
				>
					{/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
					<BottomSheetScrollView keyboardShouldPersistTaps="always" contentContainerStyle={styles?.contentContainer}>
						{editedSingleList ? (
							<EditListForm bottomSheetHeight={bottomSheetHeight} setNewColor={setNewColor} />
						) : (
							<ListItems listItems={listItems!} bottomSheetHeight={bottomSheetHeight} />
						)}
					</BottomSheetScrollView>
				</BottomSheet>
			</StyledListBackground>
		</AppWrapper>
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

const styles = StyleSheet.create({
	contentContainer: {
		width: '100%',
		maxHeight: '100%',
		flexDirection: 'column',
		paddingRight: 16,
		paddingLeft: 16,
		paddingTop: 0,
		paddingBottom: 0,
	},
});
