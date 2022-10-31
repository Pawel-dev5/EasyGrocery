import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { t } from 'i18next';

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
	StyledFloatingAddListButtonWrapper,
	StyledGridList,
	StyledListsScrollView,
	StyledOverlayBottomSheet,
} from 'components/lists/views/Styles';

// THEME
import { shadowInline } from 'utils/theme/themeDefault';

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

			{!visible && (
				<StyledFloatingAddListButtonWrapper>
					<StyledBottomAddListButton onPress={() => setListsView(!listsView)} style={shadowInline}>
						<Icon name={!listsView ? 'list' : 'th'} size={20} variant="white" />
					</StyledBottomAddListButton>
					<StyledBottomAddListButton onPress={() => setVisible(!visible)} style={shadowInline}>
						<Icon name="plus" size={20} variant="white" />
					</StyledBottomAddListButton>
				</StyledFloatingAddListButtonWrapper>
			)}

			{visible && (
				<>
					<StyledOverlayBottomSheet onPress={() => setVisible(!visible)} />
					<StyledBottomSheet style={shadowInline}>
						<StyledBottomSheetClose onPress={() => setVisible(!visible)} />

						<StyledBottomSheetBody>
							<StyledBottomSheetHeader
								style={{
									shadowColor: '#000',
									shadowOffset: {
										width: 0,
										height: 11,
									},
									shadowOpacity: 0.57,
									shadowRadius: 15.19,

									elevation: 23,
								}}
							>
								{t<string>('general.addNewList')}
							</StyledBottomSheetHeader>
							<ControllerWrapper
								name="title"
								placeholder="title"
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
				</>
			)}
		</StyledListsScrollView>
	);
};

export const Lists = ({ navigation }: { navigation: any }) => (
	<ContextProvider navigation={navigation}>
		<ListsWrapper navigation={navigation} />
	</ContextProvider>
);
