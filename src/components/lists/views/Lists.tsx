import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { t } from 'i18next';
import { v4 as uuidv4 } from 'uuid';

// ROUTER
import { lists as listRoute } from 'routes/AppRoutes';

// CONTEXT
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';
import { GlobalContextData } from 'config/useGlobalContext';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { ListVariant } from 'components/lists/models/sections';
import { List } from 'components/lists/sections';
import { ControllerWrapper } from 'components/auth/sections';
import { Icon, Loader } from 'components/layout/common';

// STYLES
import { StyledGridList, StyledListsScrollView, StyledAddListWrapper } from 'components/lists/views/Styles';
import { StyledBottomAddListButton } from 'components/layout/views/Styles';

export const ListsWrapper = (props: any) => {
	const {
		setNewList,
		backendError,
		visible,
		setVisible,
		control,
		errors,
		handleSubmit,
		listsView,
		setListsView,
		setIsLoading,
		addNewListLoader,
	} = useContext(ListsContextData);

	const { getLists, listIsLoading, lists, setLists } = useContext(GlobalContextData);

	const [refreshing, setRefreshing] = useState(false);

	const { navigation } = props;

	const onRefresh = useCallback(async () => {
		await setRefreshing(true);
		await getLists();
		await setRefreshing(false);
	}, []);

	useEffect(() => {
		setIsLoading(true);
		getLists();
	}, []);

	const floatedItems = [
		{
			id: uuidv4(),
			icon: !listsView ? 'list' : 'th',
			size: 20,
			variant: 'white',
			onPress: () => setListsView(!listsView),
		},
		{
			id: uuidv4(),
			icon: 'plus',
			size: 20,
			variant: 'white',
			onPress: () => setVisible(!visible),
		},
	];

	return (
		<>
			<AppWrapper
				{...props}
				routeName={t('general.myLists')}
				onClose={() => setVisible(false)}
				visible={visible}
				isLoading={listIsLoading}
				bottomSheetHeader="general.addNewList"
				floatedItems={floatedItems}
				bottomSheet={
					<>
						<StyledAddListWrapper>
							<ControllerWrapper
								name="title"
								placeholder={t('general.title')}
								textContentType="nickname"
								control={control}
								errors={errors}
							/>
						</StyledAddListWrapper>

						{addNewListLoader ? (
							<StyledBottomAddListButton>
								<Loader size={20} />
							</StyledBottomAddListButton>
						) : (
							<StyledBottomAddListButton onPress={handleSubmit(setNewList)}>
								<Icon name="plus" size={20} variant="white" />
							</StyledBottomAddListButton>
						)}

						{backendError && <Text>{backendError}</Text>}
					</>
				}
			>
				<StyledListsScrollView>
					{listsView ? (
						<FlatList
							data={lists}
							keyExtractor={(item) => item?.id}
							refreshing={refreshing}
							onRefresh={onRefresh}
							ListEmptyComponent={() => null}
							renderItem={({ item }) => {
								const props = {
									list: item,
									navigation,
									variant: ListVariant.PREVIEW,
									lists: lists,
									setLists: setLists,
								};
								return (
									<TouchableOpacity onPress={() => navigation?.navigate(listRoute.singleList, { id: item?.id })}>
										<List {...props} />
									</TouchableOpacity>
								);
							}}
						/>
					) : (
						<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
							<StyledGridList>
								{lists?.map((item) => {
									const props = {
										list: item,
										navigation,
										variant: ListVariant.PREVIEW,
										lists: lists,
										setLists: setLists,
									};
									return (
										<TouchableOpacity
											style={{ width: '50%' }}
											key={item?.id}
											onPress={() => navigation?.navigate(listRoute.singleList, { id: item?.id })}
										>
											<List {...props} />
										</TouchableOpacity>
									);
								})}
							</StyledGridList>
						</ScrollView>
					)}
				</StyledListsScrollView>
			</AppWrapper>
		</>
	);
};

export const Lists = ({ navigation }: { navigation: any }) => {
	const { lists, setLists, socket, setSocket } = useContext(GlobalContextData);

	return (
		<ContextProvider setLists={setLists} lists={lists} socket={socket} setSocket={setSocket} navigation={navigation}>
			<ListsWrapper navigation={navigation} />
		</ContextProvider>
	);
};
