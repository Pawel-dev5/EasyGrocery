import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, ScrollView, RefreshControl, Platform } from 'react-native';
import { t } from 'i18next';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import DraggableFlatList, { OpacityDecorator, RenderItemParams } from 'react-native-draggable-flatlist';

// ROUTER
import { lists as listRoute } from 'routes/AppRoutes';

// CONTEXT
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';
import { GlobalContextData } from 'config/useGlobalContext';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { ListInterface, ListVariant } from 'components/lists/models/sections';
import { List } from 'components/lists/sections';
import { ControllerWrapper } from 'components/auth/sections';
import { Icon, Loader } from 'components/layout/common';

// STYLES
import { StyledGridList, StyledAddListWrapper } from 'components/lists/views/Styles';
import { StyledBottomAddListButton } from 'components/layout/views/Styles';

const ListsWrapper = (props: any) => {
	const {
		addNewListLoader,
		backendError,
		visible,
		control,
		errors,
		listsView,
		setNewList,
		handleSubmit,
		setListsView,
		setIsLoading,
		setVisible,
	} = useContext(ListsContextData);

	const { getLists, lists, setLists, updateListOrder, listIsLoading } = useContext(GlobalContextData);

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

	if (Platform.OS === 'android')
		floatedItems.push({
			id: uuidv4(),
			icon: 'redo',
			size: 20,
			variant: 'white',
			onPress: () => getLists(),
		});

	return (
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

					<StyledBottomAddListButton onPress={handleSubmit(setNewList)} disabled={addNewListLoader}>
						{addNewListLoader ? <Loader size={20} /> : <Icon name="plus" size={20} variant="white" />}
					</StyledBottomAddListButton>

					{backendError && <Text>{backendError}</Text>}
				</>
			}
		>
			<>
				{listsView ? (
					<DraggableFlatList
						data={lists}
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
						onDragEnd={({ data }: { data: ListInterface[] }) => {
							updateListOrder(data);
							setLists(data);
						}}
						contentContainerStyle={{ paddingBottom: 15 }}
						keyExtractor={(item: ListInterface) => item?.id}
						renderItem={({ item, drag, isActive, getIndex }: RenderItemParams<ListInterface>) => {
							const newProps = {
								list: item,
								navigation,
								variant: ListVariant.PREVIEW,
								lists,
								setLists,
								index: getIndex()!,
							};
							return (
								<OpacityDecorator>
									<TouchableOpacity
										onLongPress={drag}
										disabled={isActive}
										onPress={() => navigation?.navigate(listRoute.singleList, { id: item?.id })}
									>
										<List {...newProps} />
									</TouchableOpacity>
								</OpacityDecorator>
							);
						}}
					/>
				) : (
					<ScrollView
						keyboardShouldPersistTaps="always"
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					>
						<StyledGridList>
							{lists?.map((item) => {
								const newProps = {
									list: item,
									navigation,
									variant: ListVariant.PREVIEW,
									lists,
									setLists,
								};
								return (
									<TouchableOpacity
										style={{ width: '50%' }}
										key={item?.id}
										onPress={() => navigation?.navigate(listRoute.singleList, { id: item?.id })}
									>
										<List {...newProps} />
									</TouchableOpacity>
								);
							})}
						</StyledGridList>
					</ScrollView>
				)}
			</>
		</AppWrapper>
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
