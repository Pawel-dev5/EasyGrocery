import React from 'react';
import { ListInterface } from '../models/sections';
import { View, Text } from 'react-native';

export const List = ({ id, attributes }: ListInterface) => {
	const { title } = attributes;
	return (
		<View key={id}>
			<Text>{title}</Text>
		</View>
	);
};
