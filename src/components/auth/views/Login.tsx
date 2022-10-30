import React, { useContext } from 'react';
import { SafeAreaView, Button, Text } from 'react-native';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';
import { useAuth } from 'components/auth/hooks/useAuth';

// COMPONENTS
import { ControllerWrapper } from 'components/auth/sections';

const schema = yup
	.object({
		email: yup.string().required(),
		password: yup.string().required(),
	})
	.required();

export const Login = () => {
	const { signIn } = useContext(GlobalContextData);
	const { submitLogin, backendError } = useAuth(signIn);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			email: 'p.nowecki@gmail.com',
			password: 'Pawel6503!',
		},
	});

	return (
		<SafeAreaView>
			<ControllerWrapper
				name="email"
				placeholder="Email"
				keyboardType="email-address"
				textContentType="emailAddress"
				autoComplete="email"
				control={control}
				errors={errors}
			/>
			<ControllerWrapper
				name="password"
				placeholder="Password"
				textContentType="password"
				autoComplete="password"
				control={control}
				errors={errors}
				type="password"
			/>

			<Button title={t<string>('auth.login')} onPress={handleSubmit(submitLogin)} />

			{backendError && <Text>{backendError}</Text>}
		</SafeAreaView>
	);
};
