import React, { useContext } from 'react';
import { t } from 'i18next';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRegister } from '../hooks/useRegister';
import { GlobalContextData } from 'config/useGlobalContext';

export const Register = () => {
	const { signIn } = useContext(GlobalContextData);

	const {
		email,
		password,
		confirmPassword,
		username,
		setUsername,
		setEmail,
		setPassword,
		handleSubmit,
		setConfirmPassword,
		error,
	} = useRegister(signIn);

	return (
		<View>
			<TextInput
				placeholder="username"
				keyboardType="default"
				textContentType="nickname"
				autoComplete="username"
				value={username}
				onChangeText={setUsername}
			/>
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
				textContentType="newPassword"
				value={password}
				onChangeText={setPassword}
			/>
			<TextInput
				placeholder="Powtórz hasło"
				keyboardType="default"
				textContentType="newPassword"
				value={confirmPassword}
				onChangeText={setConfirmPassword}
			/>

			<TouchableOpacity onPress={handleSubmit}>
				<Text>{t<string>('auth.register')}</Text>
			</TouchableOpacity>
			{/* 
			<TouchableOpacity onPress={setUser}>
				<Text>TEST</Text>
			</TouchableOpacity> */}

			<Text>{error}</Text>
		</View>
	);
};
