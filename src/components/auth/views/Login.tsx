import React, { useContext } from 'react';
import { Button, Text, SafeAreaView } from 'react-native';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';
import { useAuth } from 'components/auth/hooks/useAuth';

// COMPONENTS
import { ControllerWrapper } from 'components/auth/sections';
import { AppWrapper } from 'components/layout';

// STYLES
import { StyledLoginContainer, StyledInputWrapper } from 'components/auth/views/Styles';

const schema = yup
	.object({
		email: yup.string().required(),
		password: yup.string().required(),
	})
	.required();

export const Login = (props: any) => {
	const { signIn, lang, setLang } = useContext(GlobalContextData);
	const { submitLogin, backendError } = useAuth(signIn);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<AppWrapper routeName={t('auth.login')} {...props} lang={lang} setLang={setLang}>
			<SafeAreaView>
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

					{backendError && <Text>{backendError}</Text>}
				</StyledLoginContainer>
			</SafeAreaView>
		</AppWrapper>
	);
};
