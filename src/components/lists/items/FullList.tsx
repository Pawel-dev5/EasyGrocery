import React, { useContext, useEffect, useRef, useMemo, useCallback, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { t } from 'i18next';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

// ROUTER
import { lists } from 'routes/AppRoutes';

// REDUX
import { selectShops } from 'redux/slices/shops';
import { useAppSelector } from 'redux/hooks';

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
	StyledInputTitleWrapper,
	StyledListBackground,
	StyledListCardItemElement,
	StyledListOptionWrapper,
	StyledUsersCounter,
	StyledUsersWrapper,
	StyledListDescription,
} from 'components/lists/items/Styles';
import { selectGlobal } from 'redux/slices/global';

export const FullListWrapper = (props: any) => {
	const shopState = useAppSelector(selectShops);
	const globalState = useAppSelector(selectGlobal);
	const { shops } = shopState;
	const { token } = globalState;

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
	const { getShops } = useShops();

	const [bottomSheetHeight, setBottomSheetHeight] = useState(1);
	const [newColor, setNewColor] = useState<string | null>(null);

	const { route, navigation } = props;
	const listUuid = route?.params?.id;

	useEffect(() => {
		if (listUuid && token) {
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

	const listPricesSum = () => {
		let sum = 0;

		listItems?.forEach((item) => {
			if (item.prices && item?.prices[0]) {
				const itemPrice = Number(item.prices[0].price?.replace('zł', '')?.replace(',', '.'));
				const itemPricePromotion = Number(item.prices[0].promotion?.replace('zł', '')?.replace(',', '.'));
				if (itemPricePromotion) {
					sum += itemPricePromotion;
				} else sum += itemPrice;
			}
		});

		if (sum > 0) {
			const allSum = (Math.round(sum * 100) / 100)?.toString()?.replace('.', ',');
			return `${allSum} zł`;
		}
		return null;
	};

	return (
		<AppWrapper {...props} isLoading={isLoading} routeName={singleList?.title || t('general.myLists')} customPadding="0">
			<StyledListBackground color={newColor || singleList?.color!}>
				<StyledFullListWrapper>
					<StyledInputTitleWrapper>
						<View style={{ flexDirection: 'row' }}>
							<StyledUsersWrapper>
								<StyledListCardItemElement>
									<Icon name="users" size={20} />
								</StyledListCardItemElement>

								<StyledListCardItemElement>
									<StyledUsersCounter>{singleList?.users_permissions_users?.data?.length}</StyledUsersCounter>
								</StyledListCardItemElement>
							</StyledUsersWrapper>

							{listPricesSum() && (
								<StyledUsersWrapper>
									<StyledListCardItemElement>
										<Icon name="money-bill-wave" size={20} />
									</StyledListCardItemElement>

									<StyledListCardItemElement>
										<StyledUsersCounter>{listPricesSum()}</StyledUsersCounter>
									</StyledListCardItemElement>
								</StyledUsersWrapper>
							)}
						</View>

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

export const FullList = (props: any) => (
	<ContextProvider>
		<FullListWrapper {...props} />
	</ContextProvider>
);

const styles = StyleSheet.create({
	contentContainer: {
		width: '100%',
		maxHeight: '97.5%',
		flexDirection: 'column',
		paddingRight: 16,
		paddingLeft: 16,
		paddingTop: 0,
		paddingBottom: 0,
	},
});
