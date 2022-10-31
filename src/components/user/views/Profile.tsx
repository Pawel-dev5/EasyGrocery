import React, { useContext } from 'react';
import { t } from 'i18next';
import { Button, SafeAreaView } from 'react-native';
import axios from 'axios';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

// COMPONENTS
import { ControllerWrapper } from 'components/auth/sections';
import { AppWrapper } from 'components/layout';

const schema = yup
	.object({
		username: yup.string(),
		email: yup.string().required(),
	})
	.required();

export const Profile = (props: any) => {
	const { user, setUser, lang, setLang } = useContext(GlobalContextData);

	if (!user) return null;
	const { username, email, id } = user;

	const { control, handleSubmit, formState, getValues } = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			username,
			email,
		},
		reValidateMode: 'onChange',
	});

	const { errors } = formState;

	const updateProfile = () => {
		axios
			.put(`users/${id}`, getValues())
			.then((resp) => setUser(resp.data))
			.catch((error) => console.log(error?.response?.data?.error));
	};

	return (
		<AppWrapper routeName={t('profile.profile')} {...props} lang={lang} setLang={setLang}>
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
			</SafeAreaView>

			<Button title={t<string>('general.save')} onPress={handleSubmit(updateProfile)} />
		</AppWrapper>
	);
};
