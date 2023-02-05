import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, RefreshControl, Platform } from 'react-native';
import { t } from 'i18next';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import DraggableFlatList, { OpacityDecorator, RenderItemParams } from 'react-native-draggable-flatlist';

// ROUTER
import { lists as listRoute } from 'routes/AppRoutes';

// CONTEXT
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { ListInterface, ListVariant } from 'components/lists/models/sections';
import { List } from 'components/lists/sections';
import { ControllerWrapper } from 'components/auth/sections';
import { Icon, Loader } from 'components/layout/common';

// STYLES
import { StyledGridList, StyledAddListWrapper } from 'components/lists/views/Styles';
import { StyledBottomAddListButton } from 'components/layout/views/Styles';
import { selectLists } from 'redux/slices/lists';
import { useAppSelector } from 'redux/hooks';
import { selectGlobal } from 'redux/slices/global';

const ListsWrapper = (props: any) => {
	const listsState = useAppSelector(selectLists);
	const globalState = useAppSelector(selectGlobal);
	const lists = listsState?.lists;
	const { token } = globalState;

	const {
		addNewListLoader,
		visible,
		control,
		errors,
		listsView,
		setNewList,
		handleSubmit,
		setListsView,
		setIsLoading,
		setVisible,
		getLists,
		updateListOrder,
		listIsLoading,
	} = useContext(ListsContextData);

	const [refreshing, setRefreshing] = useState(false);

	const { navigation } = props;

	const onRefresh = useCallback(async () => {
		if (token) {
			await setRefreshing(true);
			await getLists();
			await setRefreshing(false);
		}
	}, []);

	useEffect(() => {
		if (token) {
			setIsLoading(true);
			getLists();
		}
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
			customPadding="0 0"
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
				</>
			}
		>
			<>
				{listsView ? (
					<DraggableFlatList
						data={lists}
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
						onDragEnd={({ data }: { data: ListInterface[] }) => updateListOrder(data)}
						contentContainerStyle={{ paddingBottom: 15 }}
						style={{ maxHeight: '100%' }}
						keyExtractor={(item: ListInterface) => item?.id}
						renderItem={({ item, drag, isActive, getIndex }: RenderItemParams<ListInterface>) => {
							const newProps = {
								list: item,
								navigation,
								variant: ListVariant.PREVIEW,
								lists,
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

export const Lists = ({ navigation }: { navigation: any }) => (
	<ContextProvider>
		<ListsWrapper navigation={navigation} />
	</ContextProvider>
);
