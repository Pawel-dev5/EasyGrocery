import React, { useContext, useEffect, useRef, useMemo, useCallback, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { t } from 'i18next';
import BottomSheet from '@gorhom/bottom-sheet';

// ROUTER
import { lists } from 'routes/AppRoutes';

// REDUX
import { selectShops } from 'redux/slices/shops';
import { globalSetGlobalSearchInput, selectGlobal } from 'redux/slices/global';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

// CONTEXT
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';

// HOOKS
import { useShops } from 'components/shops/hooks/useShops';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { Icon, ProgressBar } from 'components/layout/common';
import { SubmitAlert } from 'components/lists/partials';
import { ListItems, EditListForm } from 'components/lists/elements';

// STYLES
import {
	StyledActionButton,
	StyledFullListWrapper,
	StyledHeaderOptions,
	StyledListBackground,
	StyledListCardItemElement,
	StyledUsersCounter,
	StyledUsersWrapper,
	StyledListDescription,
} from 'components/lists/items/Styles';

// HELPERS
import { listPricesSum } from 'components/lists/helpers/priceHelpers';

export const FullListWrapper = (props: any) => {
	const dispatch = useAppDispatch();
	const shopState = useAppSelector(selectShops);
	const globalState = useAppSelector(selectGlobal);
	const { shops } = shopState;
	const { token, globalSearchInput } = globalState;

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
		addSingleListItem,
		addNewListItemLoader,
	} = useContext(ListsContextData);
	const { getShops } = useShops();

	const { route, navigation } = props;
	const listUuid = route?.params?.id;

	const [bottomSheetHeight, setBottomSheetHeight] = useState(1);
	const [newColor, setNewColor] = useState<string | null>(null);
	// BOTTOMSHEET CONFIG
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['4%', '78%', '99.9%'], []);
	const handleSheetChanges = useCallback((index: number) => setBottomSheetHeight(index), []);

	const listItems = filteredItems || singleList?.items;

	useEffect(() => {
		if (listUuid && token) {
			setIsLoading(true);
			getList(listUuid);
			if (shops?.length === 0) getShops();
		}
	}, []);

	useEffect(() => {
		if (globalSearchInput !== '') {
			addSingleListItem(globalSearchInput, () => dispatch(globalSetGlobalSearchInput('')));
		}
	}, [globalSearchInput]);

	return (
		<AppWrapper
			{...props}
			isLoading={isLoading}
			routeName={singleList?.title || t('general.myLists')}
			customPadding="0"
			globalAddInput
			globalInputLoader={addNewListItemLoader}
		>
			<StyledListBackground color={newColor || singleList?.color!}>
				<StyledFullListWrapper>
					<StyledHeaderOptions>
						<StyledUsersWrapper>
							<StyledActionButton>
								<Icon name="users" size={20} />
							</StyledActionButton>

							<StyledListCardItemElement>
								<StyledUsersCounter>{singleList?.users_permissions_users?.data?.length}</StyledUsersCounter>
							</StyledListCardItemElement>
						</StyledUsersWrapper>

						{listPricesSum(listItems) && (
							<StyledUsersWrapper>
								<StyledActionButton>
									<Icon name="money-bill-wave" size={20} />
								</StyledActionButton>

								<StyledListCardItemElement>
									<StyledUsersCounter>{listPricesSum(listItems)}</StyledUsersCounter>
								</StyledListCardItemElement>
							</StyledUsersWrapper>
						)}

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
									okPressed: () => deleteList(singleList?.id!, () => navigation.navigate(lists.lists)),
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
					</StyledHeaderOptions>

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

					{singleList?.shop !== null && (
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
					{editedSingleList ? (
						<EditListForm bottomSheetHeight={bottomSheetHeight} setNewColor={setNewColor} />
					) : (
						<ListItems listItems={listItems!} bottomSheetHeight={bottomSheetHeight} />
					)}
				</BottomSheet>
			</StyledListBackground>
		</AppWrapper>
	);
};

export const FullList = (props: any) => (
	<ContextProvider>
		<FullListWrapper {...props} />
	</ContextProvider>
);
