import React, { useContext, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { t } from 'i18next';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { REACT_APP_API } from '@env';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { ControllerWrapper } from 'components/auth/sections';
import { ColorsButtons } from 'components/lists/partials';
import { Loader } from 'components/layout/common';

// STYLES
import { StyledEditButton, StyledEditButtonsWrapper, StyledShopImage } from 'components/lists/elements/Styles';

// MODELS
import { ShopDataInterface } from 'components/shops/models/hooks';
import { ShopsContextData } from 'components/shops/hooks/useShops';

const schema = yup
	.object({
		title: yup.string().required(),
		description: yup.string().nullable(),
		color: yup.string().nullable(),
		// shop: yup.object().nullable(),
	})
	.required();

export const EditListForm = () => {
	const { isUpdating, editedSingleList, submitEditList, backendError } = useContext(ListsContextData);
	const users = editedSingleList?.users_permissions_users?.data;
	const { shops } = useContext(ShopsContextData);

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
			// shop: editedSingleList?.shop,
		},
	});
	console.log(editedSingleList);
	console.log(shops);

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

				{/* <Controller
					name="shop"
					control={control}
					render={({ field: { value } }) => (
						<>
							<Text>{t<string>('shops.shop')}</Text>
							<ScrollView contentContainerStyle={styles.scrollView} horizontal>
								{shops?.map((shop) => {
									const {
										id,
										attributes: {
											image: {
												data: {
													attributes: { url, alternativeText },
												},
											},
										},
									} = shop;

									const isActiveShop = () => {
										if (id === value?.data?.id || id === editedSingleList?.shop?.data?.id)
											return {
												transform: [{ scale: 1.12 }],
											};
									};
									return (
										<TouchableOpacity key={id} onPress={() => setValue('shop', { data: shop })}>
											<StyledShopImage
												source={{ uri: `${REACT_APP_API}${url.substring(1)}` }}
												style={[{ resizeMode: 'contain' }, isActiveShop()]}
												alt={alternativeText}
											/>
										</TouchableOpacity>
									);
								})}
							</ScrollView>
						</>
					)}
				/> */}

				<StyledEditButtonsWrapper>
					{isUpdating ? (
						<Loader size={30} />
					) : (
						<>
							<StyledEditButton onPress={handleSubmit(submitEditList)} disabled={isUpdating}>
								<Text>{t<string>('general.save')}</Text>
							</StyledEditButton>

							<StyledEditButton variant="delete" onPress={() => reset()} disabled={isUpdating}>
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

const styles = StyleSheet.create({
	scrollView: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		minWidth: '100%',
		justifyContent: 'space-between',
		paddingVertical: 16,
	},
});
