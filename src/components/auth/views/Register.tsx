import React, { useContext } from 'react';
import { t } from 'i18next';
import { SafeAreaView, Button, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// CONTEXT
import { useAuth } from 'components/auth/hooks/useAuth';
import { GlobalContextData } from 'config/useGlobalContext';

// COMPONENTS
import { ControllerWrapper } from 'components/auth/sections';

const schema = yup
	.object({
		username: yup.string(),
		email: yup.string().required(),
		password: yup.string().required(),
		confirmPassword: yup.string().required(),
	})
	.required();

export const Register = () => {
	const { signIn } = useContext(GlobalContextData);
	const { submitRegister, backendError } = useAuth(signIn);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<SafeAreaView>
			<ControllerWrapper
				name="username"
				placeholder="username"
				keyboardType="default"
				textContentType="nickname"
				control={control}
				errors={errors}
			/>

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
			/>

			<ControllerWrapper
				name="confirmPassword"
				placeholder="Confirm Password"
				textContentType="password"
				control={control}
				errors={errors}
			/>

			<Button title={t<string>('auth.register')} onPress={handleSubmit(submitRegister)} />

			{backendError && <Text>{backendError}</Text>}
		</SafeAreaView>
	);
};
