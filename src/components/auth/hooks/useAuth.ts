import { FieldValues } from 'react-hook-form';
import axios from 'axios';

// MODELS
import { UserDataInterface } from 'config/models';
import { useState } from 'react';

export const useAuth = (signIn?: (arg0: UserDataInterface) => void) => {
	const [backendError, setBackendError] = useState<string | null>(null);

	const submitLogin = (data: FieldValues) => {
		const { email, password } = data;

		axios
			.post('auth/local', {
				identifier: email,
				password,
			})
			.then((response) => {
				if (signIn) signIn(response.data);
			})
			.catch((error) => setBackendError(error?.response?.data?.error));
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

	return { submitLogin, submitRegister, backendError };
};
