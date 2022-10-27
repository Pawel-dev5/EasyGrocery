import { useState } from 'react';
import axios from 'axios';
import { t } from 'i18next';

// MODELS
import { UserDataInterface } from 'config/models';

export const useRegister = (signIn: (arg0: UserDataInterface) => void) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	const loginUser = () => {
		axios
			.post('api/auth/local', {
				identifier: email,
				password,
			})
			.then((response) => {
				signIn(response.data);
				setEmail('');
				setPassword('');
				setUsername('');
				setConfirmPassword('');
			})
			.catch((error) => {
				alert(error);
				setError(t('auth.loginError'));
			});
	};

	const handleSubmit = () => {
		if (email !== '' && password !== '') {
			axios
				.post('api/users', {
					email,
					password,
					username,
					confirmed: true,
				})
				.then(() => {
					loginUser();
				})
				.catch((error) => {
					alert(error.message);
					setError(t('auth.loginError'));
				});
		} else {
			setError(t('auth.enterEmailAndPassword'));
		}
	};

	return {
		username,
		email,
		password,
		confirmPassword,
		error,
		setUsername,
		setEmail,
		setPassword,
		setConfirmPassword,
		handleSubmit,
	};
};
