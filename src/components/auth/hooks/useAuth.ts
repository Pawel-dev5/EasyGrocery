import { FieldValues } from 'react-hook-form';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// MODELS
import { UserDataInterface } from 'config/models';
import { useState } from 'react';

export const useAuth = (signIn?: (arg0: UserDataInterface) => void) => {
	const [backendError, setBackendError] = useState<string | null>(null);
	const [loginStatus, setLoginStatus] = useState('PENDING');

	const submitLogin = (data: FieldValues) => {
		const { email, password } = data;

		axios
			.post('auth/local', {
				identifier: email,
				password,
			})
			.then((response) => {
				if (signIn) signIn(response?.data);
				const jsonValue = JSON.stringify(data);
				setLoginStatus('LOGGED');

				AsyncStorage.setItem('userData', jsonValue);
				AsyncStorage.setItem('userPassword', password);
				AsyncStorage.setItem('userEmail', email);
			})
			.catch((error) => {
				setLoginStatus('ERROR');
				setBackendError(error?.response?.data?.error?.message);
			});
	};

	const loginStoredUser = async () => {
		const storedPassword = await AsyncStorage.getItem('userPassword', (err, item) => item);
		const storedEmail = await AsyncStorage.getItem('userEmail', (err, item) => item);
		if (storedEmail && storedPassword) {
			submitLogin({ email: storedEmail, password: storedPassword });
			setLoginStatus('LOGGED');
		} else {
			setLoginStatus('UNLOGGED');
		}
	};

	const submitRegister = (data: FieldValues) => {
		const { email, password, username } = data;

		axios
			.post('users', {
				email,
				password,
				username,
				confirmed: true,
			})
			.then(() => {
				submitLogin(data);
			})
			.catch((error) => setBackendError(error?.response?.data?.error?.message));
	};

	const submitResetPassword = () => {
		console.log('reset password');
	};

	return { submitLogin, submitRegister, loginStoredUser, submitResetPassword, backendError, loginStatus };
};
