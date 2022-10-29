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

export const FullListWrapper = ({ navigation }: { navigation: any }) => {
	const { singleList, getList, deleteList } = useContext(ListsContextData);
	const listUuid = getRouteId(navigation, listsRoutes.singleList);

	useEffect(() => {
		if (listUuid) getList(listUuid);
	}, []);

	if (singleList) {
		const {
			id,
			attributes: { title, users_permissions_users, items },
		} = singleList;

		return (
			<View>
				<Text>{title}</Text>
				<View>
					<Icon name="users" size={20} />
					<Text>{users_permissions_users?.data?.length}</Text>
				</View>
				<View>
					<Text>{t<string>('general.list')}:</Text>
					{items?.map((item) => (
						<View key={item?.uuid}>
							<Text>{item?.value}</Text>
							<Icon variant={item?.done ? 'done' : 'unDone'} name="check-circle" size={30} />
						</View>
					))}
				</View>
				<TouchableOpacity onPress={() => deleteList(id)}>
					<Icon name="trash" size={20} />
				</TouchableOpacity>
			</View>
		);
	}
	return <Text>Brak danych</Text>;
};

export const FullList = ({ navigation }: { navigation: any }) => (
	<ContextProvider>
		<FullListWrapper navigation={navigation} />
	</ContextProvider>
);
