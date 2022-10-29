import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// ROUTER
import { lists as listRoute } from 'routes/AppRoutes';

// COMPONENTS
import { Icon } from 'components/layout/common/Icon';
import { FullList } from 'components/lists/items/FullList';

// MODELS
import { ListVariant, ListWrapperInterface } from 'components/lists/models/sections';
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';

export const ListWrapper = ({ list, variant, navigation, lists }: ListWrapperInterface) => {
	const { deleteList } = useContext(ListsContextData);

	switch (variant) {
		case ListVariant.PREVIEW:
			if (list) {
				const { title, users_permissions_users, items, id } = list;
				return (
					<View>
						<TouchableOpacity onPress={() => navigation.navigate(listRoute.singleList, { id })}>
							<View>
								<Text>{title}</Text>
								<View>
									<Icon name="users" size={20} />
									<Text>{users_permissions_users?.length}</Text>
								</View>
								<View>
									<Icon name="clipboard-list" size={20} />
									<Text>{items?.length}</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => deleteList(id)}>
							<Icon name="trash" size={20} />
						</TouchableOpacity>
					</View>
				);
			}
			return null;
		case ListVariant.FULL:
			return <FullList navigation={navigation} lists={lists} />;
		default:
			return null;
	}
};

export const List = ({ list, variant, navigation, lists }: ListWrapperInterface) => (
	<ContextProvider>
		<ListWrapper navigation={navigation} list={list} variant={variant} lists={lists} />
	</ContextProvider>
);
