import React, { useContext, useEffect, useState } from 'react';
import { Text, SafeAreaView } from 'react-native';
import { t } from 'i18next';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { ControllerWrapper } from 'components/auth/sections';
import { ColorsButtons, ListShops } from 'components/lists/partials';
import { Icon, Loader } from 'components/layout/common';
import { Search } from 'components/layout/elements';

// STYLES
import {
	StyledEditButton,
	StyledEditButtonsWrapper,
	StyledEditFormWrapper,
	StyledEditFormWrapperTitle,
	StyledUsersWrapper,
	StyledUserTitle,
	StyledAddUserButton,
	StyledAddUserWrapper,
	StyledEditListWrapper,
} from 'components/lists/elements/Styles';

// MODELS
import { User } from 'config/models';

// HELPERS
import { findObjectInArray, removeObjectFromArray } from 'utils/helpers/arrayHelpers';
import { EditListFormInterface } from 'components/lists/models/elements';

const schema = yup
	.object({
		title: yup.string().required(),
		description: yup.string().nullable(),
		color: yup.string().nullable(),
	})
	.required();

export const EditListForm = ({ bottomSheetHeight, setNewColor }: EditListFormInterface) => {
	const {
		isUpdating,
		editedSingleList,
		user,
		searchedUsers,
		submitEditList,
		setSearchIcons,
		setNewShop,
		listUsers,
		setListUsers,
		setEditedSingleList,
	} = useContext(ListsContextData);

	const [showMoreAdd, setShowMoreAdd] = useState(false);

	const users = editedSingleList?.users_permissions_users?.data?.filter(
		(permissedUser) => permissedUser?.attributes?.email !== user?.email,
	);
	const invitedUsers = editedSingleList?.invitations;

	useEffect(() => {
		if (users) {
			const newArr: any = [];
			users?.forEach((newUser) => {
				const newObject = {
					id: newUser?.id,
					...newUser?.attributes,
					access: 'FULL',
				};
				newArr.push(newObject);
			});
			invitedUsers?.forEach((newUser) => {
				const newObject = {
					id: newUser?.uuid,
					...newUser,
					access: 'PENDING',
				};
				newArr.push(newObject);
			});
			setListUsers([...newArr]);
		}
	}, []);

	const addNewUser = (newUser: User) => {
		const find = findObjectInArray(listUsers, 'email', newUser?.email);

		if (listUsers?.includes(newUser) || find) {
			const newArr = removeObjectFromArray(listUsers, 'email', newUser?.email);
			setListUsers([...newArr]);
		} else setListUsers([...listUsers, { ...newUser, access: 'PENDING' }]);
	};

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
		<StyledEditListWrapper keyboardShouldPersistTaps="always" bottomSheetHeight={bottomSheetHeight}>
			<SafeAreaView>
				<StyledEditFormWrapper>
					<StyledEditFormWrapperTitle>{t<string>('general.title')}</StyledEditFormWrapperTitle>
					<ControllerWrapper
						name="title"
						placeholder={t('general.title')}
						textContentType="nickname"
						control={control}
						errors={errors}
					/>
				</StyledEditFormWrapper>

				<StyledEditFormWrapper>
					<StyledEditFormWrapperTitle>{t<string>('general.description')}</StyledEditFormWrapperTitle>
					<ControllerWrapper
						name="description"
						placeholder={t('general.description')}
						textContentType="none"
						control={control}
						errors={errors}
					/>
				</StyledEditFormWrapper>

				<StyledEditFormWrapper style={{ zIndex: 2 }}>
					<StyledEditFormWrapperTitle>{t<string>('general.users')}</StyledEditFormWrapperTitle>

					<StyledUsersWrapper>
						{listUsers?.map((newUser) => (
							<StyledUserTitle key={newUser?.id} colorType={newUser?.access}>
								{newUser?.attributes?.username || newUser?.username}
							</StyledUserTitle>
						))}

						<StyledAddUserButton onPress={() => setShowMoreAdd(!showMoreAdd)} active={showMoreAdd}>
							<Icon size={15} name="plus" />
						</StyledAddUserButton>
					</StyledUsersWrapper>

					<StyledAddUserWrapper>
						{showMoreAdd && (
							<Search
								setSearchIcons={setSearchIcons}
								name={t('general.searchUser')}
								placeholder={t('general.searchUser')}
								textContentType="none"
								results={searchedUsers}
								actualUsers={listUsers}
								optionOnClick={addNewUser}
							/>
						)}
					</StyledAddUserWrapper>
				</StyledEditFormWrapper>

				<StyledEditFormWrapper style={{ zIndex: 1 }}>
					<StyledEditFormWrapperTitle>{t<string>('general.color')}</StyledEditFormWrapperTitle>
					<Controller
						name="color"
						control={control}
						render={({ field: { value } }) => <ColorsButtons setValue={setValue} setNewColor={setNewColor} value={value} />}
					/>
				</StyledEditFormWrapper>

				<StyledEditFormWrapper>
					<StyledEditFormWrapperTitle>{t<string>('shops.shop')}</StyledEditFormWrapperTitle>
					<ListShops />
				</StyledEditFormWrapper>

				<StyledEditButtonsWrapper>
					{isUpdating ? (
						<Loader size={50} />
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
									setEditedSingleList(null);
								}}
								disabled={isUpdating}
							>
								<Text>{t<string>('general.cancel')}</Text>
							</StyledEditButton>
						</>
					)}
				</StyledEditButtonsWrapper>
			</SafeAreaView>
		</StyledEditListWrapper>
	);
};
