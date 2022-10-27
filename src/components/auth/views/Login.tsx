import React, { useContext } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text } from 'react-native';
import { t } from 'i18next';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
	const { signIn } = useContext(GlobalContextData);

	const { email, password, setEmail, setPassword, handleSubmit, error } = useAuth(signIn);

	// const fetchUsers = () => {
	// 	axios
	// 		.get('http://192.168.0.129:1337/api/users')
	// 		.then(function (response) {
	// 			console.log(response.data);
	// 		})
	// 		.catch(function (error) {
	// 			alert(error);
	// 		});
	// };

	// useEffect(() => {
	// 	fetchUsers();
	// }, []);

	return (
		<SafeAreaView>
			<TextInput
				placeholder="email"
				keyboardType="email-address"
				textContentType="emailAddress"
				autoComplete="email"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				placeholder="password"
				keyboardType="default"
				textContentType="password"
				value={password}
				onChangeText={setPassword}
			/>

			<TouchableOpacity onPress={handleSubmit}>
				<Text>{t<string>('auth.login')}</Text>
			</TouchableOpacity>

			<Text>{error}</Text>
		</SafeAreaView>
	);
};
