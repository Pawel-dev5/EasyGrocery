import React, { useContext } from 'react';
import { t } from 'i18next';
import { View, Text, TouchableOpacity } from 'react-native';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

export const Login = () => {
	const { setIsAuth } = useContext(GlobalContextData);

	return (
		<View>
			<TouchableOpacity onPress={() => setIsAuth(true)}>
				<Text>{t<string>('auth.login')}</Text>
			</TouchableOpacity>
		</View>
	);
};
