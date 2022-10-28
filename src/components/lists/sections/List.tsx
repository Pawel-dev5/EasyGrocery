import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// COMPONENTS
import { Icon } from 'components/layout/common/Icon';

// MODELS
import { ListVariant, ListWrapperInterface } from 'components/lists/models/sections';
import { lists as listRoute } from 'routes/AppRoutes';
import { FullList } from '../Items/FullList';

export const List = ({ list, variant, navigation }: ListWrapperInterface) => {
	switch (variant) {
		case ListVariant.PREVIEW:
			if (list) {
				const { title, users_permissions_users, items, id } = list;
				return (
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
				);
			}
			return null;
		case ListVariant.FULL:
			return <FullList />;
		default:
			return null;
	}
};
