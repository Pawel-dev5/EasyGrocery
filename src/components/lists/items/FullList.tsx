import React, { useContext, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { t } from 'i18next';
import { Manager } from 'socket.io-client';
import { REACT_APP_API } from '@env';

// CONTEXT
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';
import { GlobalContextData } from 'config/useGlobalContext';
import { ContextProvider as ShopContextProvider, ShopsContextData } from 'components/shops/hooks/useShops';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { Icon, Loader, ProgressBar } from 'components/layout/common';
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

export const FullListWrapper = (props: any) => {
	const {
		singleList,
		getList,
		deleteList,
		clearSingleListItems,
		setShowDone,
		filteredItems,
		showDone,
		isLoading,
		setIsLoading,
		editedSingleList,
		setEditedSingleList,
		sortItemsByCategories,
		sortedListItemsByCategories,
		setSocket,
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

	// SOCKET.IO START
	useEffect(() => {
		const manager = new Manager(REACT_APP_API, {
			reconnectionDelayMax: 10000,
		});
		const socket = manager.socket('/');
		setSocket(socket);
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
												okPressed: () => clearSingleListItems(),
												okText: t('general.delete'),
												cancelText: t('general.cancel'),
												cancelPressed: () => {},
												alertTitle: singleList?.title ?? '',
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
												alertTitle: singleList?.title ?? '',
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
							{editedSingleList ? <EditListForm /> : <ListItems listItems={listItems} />}
						</StyledItemsWrapper>
					</StyledListBackground>
				</AppWrapper>
			</>
		);
	}
	return <Loader size={100} />;
};

export const FullList = (props: any) => (
	<ContextProvider>
		<ShopContextProvider>
			<FullListWrapper {...props} />
		</ShopContextProvider>
	</ContextProvider>
);
