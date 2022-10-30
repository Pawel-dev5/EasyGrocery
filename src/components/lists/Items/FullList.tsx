import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { t } from 'i18next';

// CONTEXT
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { Icon, Input } from 'components/layout/common';

export const FullListWrapper = ({ route }: { route: any }) => {
	const {
		singleList,
		singleListEditable,
		getList,
		deleteList,
		addNewListItem,
		editSingleListTitle,
		setIsEdited,
		setEditedValue,
		editSingleListItems,
		setShowDone,
		filteredItems,
		showDone,
	} = useContext(ListsContextData);
	const listUuid = route?.params?.id;

	useEffect(() => {
		if (listUuid) getList(listUuid);
	}, []);

	if (singleList) {
		const { id, title, users_permissions_users, items } = singleList;
		const listItems = filteredItems || items;

		return (
			<View>
				<View>
					{singleListEditable?.isEdited === 'title' ? (
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

					<TouchableOpacity onPress={() => editSingleListItems('clear', id!)}>
						<Icon name="broom" size={20} />
					</TouchableOpacity>

					{listItems?.map((item) => (
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
						placeholder="Add"
						textContentType="nickname"
						onKeyPress={(e) => console.log(e.nativeEvent)}
						onChange={(text) => addNewListItem(text)}
					/>
					<TouchableOpacity onPress={() => editSingleListItems('add')}>
						<Icon name="plus" size={20} />
					</TouchableOpacity>
				</View>
				{(showDone !== 'done' || showDone === null) && (
					<TouchableOpacity onPress={() => setShowDone('done')}>
						<Text>Pokaż tylko zrobione</Text>
					</TouchableOpacity>
				)}

				{(showDone !== 'unDone' || showDone === null) && (
					<TouchableOpacity onPress={() => setShowDone('unDone')}>
						<Text>Pokaż tylko niezrobione</Text>
					</TouchableOpacity>
				)}

				{showDone !== null && (
					<TouchableOpacity onPress={() => setShowDone(null)}>
						<Text>Pokaż wszystko</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	}
	return <Text>Brak danych</Text>;
};

export const FullList = (props: any) => (
	<ContextProvider>
		<FullListWrapper {...props} />
	</ContextProvider>
);
