import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { t } from 'i18next';
import { BottomSheet } from 'react-native-btr';

// ROUTER
import { lists as listRoute } from 'routes/AppRoutes';

// HOOK
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { ListVariant } from 'components/lists/models/sections';
import { List } from 'components/lists/sections';
import { ControllerWrapper } from 'components/auth/sections';
import { Icon } from 'components/layout/common';

// STYLES
import {
	StyledBottomAddListButton,
	StyledBottomSheet,
	StyledBottomSheetBody,
	StyledBottomSheetClose,
	StyledBottomSheetHeader,
	StyledFloatingAddListButton,
	StyledGridList,
	StyledListsScrollView,
	StyledListStyleDisplay,
} from 'components/lists/views/Styles';

export const ListsWrapper = ({ navigation }: { navigation: any }) => {
	const {
		lists,
		getLists,
		setNewList,
		backendError,
		visible,
		setVisible,
		control,
		errors,
		handleSubmit,
		listsView,
		setListsView,
	} = useContext(ListsContextData);

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(async () => {
		await setRefreshing(true);
		await getLists();
		await setRefreshing(false);
	}, []);

	useEffect(() => {
		getLists();
	}, []);

	return (
		<StyledListsScrollView>
			<StyledListStyleDisplay onPress={() => setListsView(!listsView)}>
				<Icon name={!listsView ? 'list' : 'th'} size={20} variant="white" />
			</StyledListStyleDisplay>

			{listsView ? (
				<FlatList
					data={lists}
					keyExtractor={(item) => item?.id}
					refreshing={refreshing}
					onRefresh={onRefresh}
					renderItem={({ item }) => {
						const props = {
							list: item,
							navigation,
							variant: ListVariant.PREVIEW,
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
						{lists.map((item) => {
							const props = {
								list: item,
								navigation,
								variant: ListVariant.PREVIEW,
								type: 'grid',
							};
							return (
								<TouchableOpacity
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

			<StyledFloatingAddListButton onPress={() => setVisible(!visible)}>
				<Icon name="plus" size={20} variant="white" />
			</StyledFloatingAddListButton>

			<BottomSheet
				visible={visible}
				onBackButtonPress={() => setVisible(!visible)}
				onBackdropPress={() => setVisible(!visible)}
			>
				<StyledBottomSheet>
					<StyledBottomSheetClose onPress={() => setVisible(!visible)} />

					<StyledBottomSheetBody>
						<StyledBottomSheetHeader>{t<string>('general.addNewList')}</StyledBottomSheetHeader>
						<ControllerWrapper
							name="title"
							placeholder="title"
							textContentType="nickname"
							control={control}
							errors={errors}
						/>
						<ControllerWrapper
							name="description"
							placeholder="description"
							textContentType="nickname"
							control={control}
							errors={errors}
						/>
						<StyledBottomAddListButton onPress={handleSubmit(setNewList)}>
							<Icon name="plus" size={20} variant="white" />
						</StyledBottomAddListButton>

						{backendError && <Text>{backendError}</Text>}
					</StyledBottomSheetBody>
				</StyledBottomSheet>
			</BottomSheet>
		</StyledListsScrollView>
	);
};

export const Lists = ({ navigation }: { navigation: any }) => (
	<ContextProvider navigation={navigation}>
		<ListsWrapper navigation={navigation} />
	</ContextProvider>
);
