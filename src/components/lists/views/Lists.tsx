import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';

// HOOK
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { ListVariant } from 'components/lists/models/sections';
import { List } from 'components/lists/sections';

export const ListsWrapper = ({ navigation }: { navigation: any }) => {
	const { lists, getLists } = useContext(ListsContextData);

	useEffect(() => {
		getLists();
	}, []);

	return (
		<View>
			{lists?.map((list) => (
				<List key={list?.id} list={list} variant={ListVariant.PREVIEW} navigation={navigation} />
			))}
		</View>
	);
};

export const Lists = ({ navigation }: { navigation: any }) => (
	<ContextProvider>
		<ListsWrapper navigation={navigation} />
	</ContextProvider>
);
