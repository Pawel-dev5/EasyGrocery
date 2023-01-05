import React, { useContext } from 'react';
import { Button, Text } from 'react-native';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';
import { useAuth } from 'components/auth/hooks/useAuth';

// COMPONENTS
import { ControllerWrapper, ScreenWrapper } from 'components/auth/sections';
import { AppWrapper } from 'components/layout';

// STYLES
import { StyledLoginContainer, StyledInputWrapper, StyledLoginButtonsWrapper } from 'components/auth/views/Styles';

const schema = yup
	.object({
		email: yup.string().required(),
	})
	.required();

export const Forgot = (props: any) => {
	const { signIn, lang, setLang } = useContext(GlobalContextData);
	const { submitResetPassword, backendError, loginStatus } = useAuth(signIn);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<AppWrapper routeName={t('auth.login')} {...props} lang={lang} setLang={setLang} customPadding="0">
			<ScreenWrapper props={props}>
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

					<StyledLoginButtonsWrapper>
						<Button title={t<string>('auth.resetPassword')} onPress={handleSubmit(submitResetPassword)} />
					</StyledLoginButtonsWrapper>

					{backendError && <Text>{backendError}</Text>}
				</StyledLoginContainer>
			</ScreenWrapper>
		</AppWrapper>
	);
};
