import React, { useContext } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { t } from 'i18next';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { ControllerWrapper } from 'components/auth/sections';
import { ColorsButtons, ListShops } from 'components/lists/partials';
import { Loader } from 'components/layout/common';

// STYLES
import { StyledEditButton, StyledEditButtonsWrapper } from 'components/lists/elements/Styles';

const schema = yup
	.object({
		title: yup.string().required(),
		description: yup.string().nullable(),
		color: yup.string().nullable(),
	})
	.required();

export const EditListForm = () => {
	const { isUpdating, editedSingleList, submitEditList, backendError, setNewShop, newShop } = useContext(ListsContextData);
	const users = editedSingleList?.users_permissions_users?.data;

	const {
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			title: editedSingleList?.title,
			description: editedSingleList?.description,
			color: editedSingleList?.color,
		},
	});

	return (
		<ScrollView>
			<SafeAreaView>
				<Text>{t<string>('general.title')}</Text>

				<ControllerWrapper
					name="title"
					placeholder={t('general.title')}
					textContentType="nickname"
					control={control}
					errors={errors}
				/>
				<Text>{t<string>('general.description')}</Text>

				<ControllerWrapper
					name="description"
					placeholder={t('general.description')}
					textContentType="none"
					control={control}
					errors={errors}
				/>

				<View>
					<Text>{t<string>('general.users')}</Text>
					{users?.map((user) => (
						<View key={user?.id}>
							<Text>{user?.attributes?.username}</Text>
						</View>
					))}
				</View>

				<Text>{t<string>('general.color')}</Text>

				<Controller
					name="color"
					control={control}
					render={({ field: { value } }) => (
						<>
							<ColorsButtons setValue={setValue} value={value} />
						</>
					)}
				/>

				<ListShops />

				<StyledEditButtonsWrapper>
					{isUpdating ? (
						<Loader size={30} />
					) : (
						<>
							<StyledEditButton onPress={handleSubmit(submitEditList)} disabled={isUpdating}>
								<Text>{t<string>('general.save')}</Text>
							</StyledEditButton>

							<StyledEditButton
								variant="delete"
								onPress={() => {
									setNewShop(null);
									reset();
								}}
								disabled={isUpdating}
							>
								<Text>{t<string>('general.cancel')}</Text>
							</StyledEditButton>
						</>
					)}
				</StyledEditButtonsWrapper>

				{backendError && <Text>{backendError}</Text>}
			</SafeAreaView>
		</ScrollView>
	);
};
