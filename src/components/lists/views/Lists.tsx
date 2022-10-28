import React, { useContext, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

import { useList } from '../hooks/useList';

// COMPONENTS
import { ListInterface } from '../models/sections';
import { List } from '../sections/List';

export const Lists = () => {
	const { lists, getLists } = useList();
	const { user } = useContext(GlobalContextData);

	// if (!lists) return <Text>elo</Text>;

	useEffect(() => {
		console.log(lists);
		getLists();
	}, []);

	return (
		<View>
			{lists?.map((item: ListInterface) => (
				<List {...item} />
			))}

			<Button title="elo" onPress={() => getLists()} />
		</View>
	);
};
