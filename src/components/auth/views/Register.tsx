import React, { useContext } from 'react';
import { t } from 'i18next';
import { Button, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// ROUTER
import { auth } from 'routes/AppRoutes';

// CONTEXT
import { useAuth } from 'components/auth/hooks/useAuth';
import { GlobalContextData } from 'config/useGlobalContext';

// COMPONENTS
import { ControllerWrapper, ScreenWrapper } from 'components/auth/sections';
import { AppWrapper } from 'components/layout';

// STYLES
import {
	StyledLoginContainer,
	StyledInputWrapper,
	StyledLoginButtonsWrapper,
	StyledRegister,
} from 'components/auth/views/Styles';

const schema = yup
	.object({
		username: yup.string(),
		email: yup.string().required(),
		password: yup.string().required(),
		confirmPassword: yup.string().required(),
	})
	.required();

export const Register = (props: any) => {
	const { signIn } = useContext(GlobalContextData);
	const { submitRegister, backendError } = useAuth(signIn);

	const { navigation } = props;

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<AppWrapper routeName={t('auth.register')} {...props} customPadding="0">
			<ScreenWrapper props={props}>
				<StyledLoginContainer>
					<StyledInputWrapper>
						<ControllerWrapper
							name="username"
							placeholder={t('general.nick')}
							keyboardType="default"
							textContentType="nickname"
							control={control}
							errors={errors}
						/>
					</StyledInputWrapper>

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
							type="password"
							control={control}
							errors={errors}
						/>
					</StyledInputWrapper>

					<StyledInputWrapper>
						<ControllerWrapper
							name="confirmPassword"
							placeholder={t('auth.cofirmPassword')}
							textContentType="password"
							type="password"
							control={control}
							errors={errors}
						/>
					</StyledInputWrapper>

					<Button title={t<string>('auth.register')} onPress={handleSubmit(submitRegister)} />
					<StyledLoginButtonsWrapper>
						<Text>{t<string>('auth.haveAccount')}</Text>

						<TouchableOpacity onPress={() => navigation.navigate(auth.login)}>
							<StyledRegister>{t<string>('auth.login')}</StyledRegister>
						</TouchableOpacity>
					</StyledLoginButtonsWrapper>

					{backendError && <Text>{backendError}</Text>}
				</StyledLoginContainer>
			</ScreenWrapper>
		</AppWrapper>
	);
};
