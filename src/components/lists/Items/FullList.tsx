import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { t } from 'i18next';

// CONTEXT
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { Icon } from 'components/layout/common/Icon';
import { lists as listsRoutes } from 'routes/AppRoutes';

// MODELS
import { getRouteId } from 'utils/helpers/getRouteId';
import { Input } from 'components/layout/common/Input';
import { ListInterface } from 'components/lists/models/sections';

export const FullListWrapper = ({ navigation, lists }: { navigation: any; lists?: ListInterface[] }) => {
	const {
		singleList,
		getList,
		deleteList,
		singleListEditable,
		addNewListItem,
		editSingleListTitle,
		setIsEdited,
		setEditedValue,
		editSingleListItems,
	} = useContext(ListsContextData);
	const listUuid = getRouteId(navigation, listsRoutes.singleList);

	useEffect(() => {
		if (listUuid) getList(listUuid);
	}, []);

	if (singleList) {
		const { id, title, users_permissions_users, items } = singleList;

		return (
			<View>
				<View>
					{singleListEditable.isEdited === 'title' ? (
						<>
							<Input
								value={singleListEditable?.value?.title!}
								name="title"
								placeholder="title"
								textContentType="nickname"
								onChange={(text) => setEditedValue(text as unknown as string)}
							/>
							<TouchableOpacity onPress={() => editSingleListTitle()}>
								<Icon name="check" size={20} />
							</TouchableOpacity>
						</>
					) : (
						<>
							<Text>{title}</Text>
							<TouchableOpacity onPress={() => setIsEdited(title)}>
								<Icon name="edit" size={20} />
							</TouchableOpacity>
						</>
					)}
				</View>

				<View>
					<Icon name="users" size={20} />
					<Text>{users_permissions_users?.data?.length}</Text>
				</View>
				<TouchableOpacity onPress={() => deleteList(id!)}>
					<Icon name="trash" size={20} />
				</TouchableOpacity>
				<View>
					<Text>{t<string>('general.list')}:</Text>
					{items?.map((item) => (
						<View key={item?.id}>
							<Text>{item?.value}</Text>
							<TouchableOpacity onPress={() => editSingleListItems('update', item.id)}>
								<Icon variant={item?.done ? 'done' : 'unDone'} name="check-circle" size={30} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => editSingleListItems('delete', item.id)}>
								<Icon name="trash" size={20} />
							</TouchableOpacity>
						</View>
					))}
				</View>

				<View>
					<Input
						value={singleListEditable?.value?.newItem.value!}
						name="title"
						placeholder="title"
						textContentType="nickname"
						onChange={(text) => addNewListItem(text)}
					/>
					<TouchableOpacity onPress={() => editSingleListItems('add')}>
						<Icon name="plus" size={20} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
	return <Text>Brak danych</Text>;
};

export const FullList = ({ navigation, lists }: { navigation: any; lists?: ListInterface[] }) => (
	<ContextProvider>
		<FullListWrapper navigation={navigation} lists={lists} />
	</ContextProvider>
);
