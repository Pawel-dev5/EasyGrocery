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
import { AppWrapper } from 'components/layout';

// STYLES
import { StyledLoginContainer, StyledInputWrapper } from 'components/auth/views/Styles';

const schema = yup
	.object({
		username: yup.string(),
		email: yup.string().required(),
		password: yup.string().required(),
		confirmPassword: yup.string().required(),
	})
	.required();

export const Register = (props: any) => {
	const { signIn, lang, setLang } = useContext(GlobalContextData);
	const { submitRegister, backendError } = useAuth(signIn);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<AppWrapper routeName={t('auth.register')} {...props} lang={lang} setLang={setLang}>
			<SafeAreaView>
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

					{backendError && <Text>{backendError}</Text>}
				</StyledLoginContainer>
			</SafeAreaView>
		</AppWrapper>
	);
};
