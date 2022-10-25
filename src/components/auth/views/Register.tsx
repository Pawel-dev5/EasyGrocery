import React from 'react';
import { t } from 'i18next';
import { View, Text } from 'react-native';

export const Register = () => {
	return (
		<View>
			<Text>{t<string>('auth.register')}</Text>
		</View>
	);
};
