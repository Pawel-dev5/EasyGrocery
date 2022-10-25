import React, { useContext, useEffect } from 'react';
import { t } from 'i18next';
import { View, Text, TouchableOpacity } from 'react-native';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';
import axios from 'axios';

export const Login = () => {
	const { setIsAuth } = useContext(GlobalContextData);

	const fetchUsers = () => {
		axios
			.get('http://192.168.0.129:1337/api/users')
			.then(function (response) {
				console.log(response.data);
			})
			.catch(function (error) {
				alert(error);
			});
	};

	useEffect(() => {
		fetchUsers();
	}, []);
	return (
		<View>
			<TouchableOpacity onPress={() => setIsAuth(true)}>
				<Text>{t<string>('auth.login')}</Text>
			</TouchableOpacity>
		</View>
	);
};
