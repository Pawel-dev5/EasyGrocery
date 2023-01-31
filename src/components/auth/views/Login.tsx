import React, { useEffect } from 'react';
import { Button, Text, TouchableOpacity } from 'react-native';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// ROUTER
import { auth } from 'routes/AppRoutes';

// CONTEXT
import { useAuth } from 'components/auth/hooks/useAuth';

// COMPONENTS
import { ControllerWrapper, ScreenWrapper } from 'components/auth/sections';
import { AppWrapper } from 'components/layout';
import { Loader } from 'components/layout/common';

// STYLES
import {
	StyledLoginContainer,
	StyledInputWrapper,
	StyledLoginButtonsWrapper,
	StyledRegister,
} from 'components/auth/views/Styles';

const schema = yup
	.object({
		email: yup.string().required(),
		password: yup.string().required(),
	})
	.required();

export const Login = (props: any) => {
	const { submitLogin, backendError, loginStoredUser, loginStatus } = useAuth();

	const { navigation } = props;

	useEffect(() => {
		loginStoredUser();
	}, []);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	if (loginStatus === 'PANDING' || loginStatus === 'LOGGED') return <Loader size={100} />;

	return (
		<AppWrapper routeName={t('auth.login')} {...props} customPadding="0">
			<ScreenWrapper>
				<StyledLoginContainer>
					<StyledInputWrapper>
						<ControllerWrapper
							name="email"
							placeholder="Email"
							keyboardType="email-address"
							textContentType="emailAddress"
							autoComplete="email"
							control={control}
							errors={errors}
						/>
					</StyledInputWrapper>

					<StyledInputWrapper>
						<ControllerWrapper
							name="password"
							placeholder={t('auth.password')}
							textContentType="password"
							autoComplete="password"
							control={control}
							errors={errors}
							type="password"
						/>
					</StyledInputWrapper>

					<Button title={t<string>('auth.login')} onPress={handleSubmit(submitLogin)} />

					<StyledLoginButtonsWrapper>
						<Text>{t<string>('auth.dontHaveAccount')}</Text>

						<TouchableOpacity onPress={() => navigation.navigate(auth.register)}>
							<StyledRegister>{t<string>('auth.register')}</StyledRegister>
						</TouchableOpacity>
					</StyledLoginButtonsWrapper>

					<TouchableOpacity onPress={() => navigation.navigate(auth.passwordForgot)}>
						<Text>{t<string>('auth.forgotPassword')}</Text>
					</TouchableOpacity>

					{backendError && <Text>{backendError}</Text>}
				</StyledLoginContainer>
			</ScreenWrapper>
		</AppWrapper>
	);
};
