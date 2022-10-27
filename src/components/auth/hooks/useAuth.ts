import { useState } from 'react';
import axios from 'axios';
import { t } from 'i18next';

// MODELS
import { UserDataInterface } from 'config/models';

export const useAuth = (signIn: (arg0: UserDataInterface) => void) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = () => {
		if (email !== '' && password !== '') {
			axios
				.post('api/auth/local', {
					identifier: email,
					password,
				})
				.then((response) => {
					signIn(response.data);
					setEmail('');
					setPassword('');
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
