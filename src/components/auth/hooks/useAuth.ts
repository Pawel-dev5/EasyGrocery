import { FieldValues } from 'react-hook-form';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// REDUX
import { globalSetAuthToken, selectGlobal } from 'redux/slices/global';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

// MODELS
import { useState } from 'react';

export const useAuth = () => {
	const dispatch = useAppDispatch();
	const globalState = useAppSelector(selectGlobal);

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
				const jsonValue = JSON.stringify(data);
				dispatch(globalSetAuthToken(response?.data));
				AsyncStorage.setItem('userData', jsonValue);
				AsyncStorage.setItem('userPassword', password);
				AsyncStorage.setItem('userEmail', email);
				setLoginStatus('LOGGED');
			})
			.catch((error) => {
				setLoginStatus('ERROR');
				setBackendError(error?.response?.data?.error?.message);
			});
	};

	const signOut = () => {
		if (globalState?.token) {
			dispatch(globalSetAuthToken({ jwt: null, user: null }));
			AsyncStorage.removeItem('userPassword');
			AsyncStorage.removeItem('userEmail');
		}
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

	if (globalState?.token) axios.defaults.headers.common.Authorization = `Bearer ${globalState?.token}`;

	return { submitLogin, submitRegister, loginStoredUser, submitResetPassword, signOut, backendError, loginStatus };
};
