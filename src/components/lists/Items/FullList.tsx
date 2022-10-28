import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';

// COMPONENTS
import { Icon } from 'components/layout/common/Icon';

// MODELS
import { ContextProvider, ListsContextData } from '../hooks/useList';
import { t } from 'i18next';

export const FullListWrapper = () => {
	const { singleList, getList } = useContext(ListsContextData);

	useEffect(() => {
		getList();
	}, []);

	if (singleList) {
		const {
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
			</View>
		);
	}
	return <Text>Brak danych</Text>;
};

export const FullList = () => (
	<ContextProvider>
		<FullListWrapper />
	</ContextProvider>
);
