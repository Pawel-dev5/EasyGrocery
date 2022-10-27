import { useState } from 'react';
import axios from 'axios';
import { t } from 'i18next';

// MODELS
import { UserDataInterface } from 'config/models';
import { GestureResponderEvent } from 'react-native';

export const useAuth = (signIn: (arg0: UserDataInterface) => void) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (e: GestureResponderEvent) => {
		e.preventDefault();
		if (email !== '' && password !== '') {
			axios
				.post('http://192.168.0.129:1337/api/auth/local', {
					identifier: email,
					password,
				})
				.then((response) => {
					signIn(response.data);
				})
				.catch((error) => {
					alert(error);
					setError(t('auth.loginError'));
				});
		} else {
			setError(t('auth.enterEmailAndPassword'));
		}
	};

	return { email, password, error, setEmail, setPassword, handleSubmit };
};
