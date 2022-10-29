import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ScrollView, Button, Text, SafeAreaView, RefreshControl } from 'react-native';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// HOOK
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';

// COMPONENTS
import { ListVariant } from 'components/lists/models/sections';
import { List } from 'components/lists/sections';
import { ControllerWrapper } from 'components/auth/sections';

const schema = yup
	.object({
		title: yup.string().required(),
		description: yup.string(),
	})
	.required();

export const ListsWrapper = ({ navigation }: { navigation: any }) => {
	const { lists, getLists, setNewList, backendError } = useContext(ListsContextData);

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(async () => {
		await setRefreshing(true);
		await getLists();
		await setRefreshing(false);
	}, []);

	console.log(lists);
	useEffect(() => {
		getLists();
	}, []);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
			{lists?.map((list) => (
				<List key={list?.id} list={list} variant={ListVariant.PREVIEW} navigation={navigation} />
			))}

			<Text>{t<string>('general.addNewList')}</Text>

			<SafeAreaView>
				<ControllerWrapper name="title" placeholder="title" textContentType="nickname" control={control} errors={errors} />
				<ControllerWrapper
					name="description"
					placeholder="description"
					textContentType="nickname"
					control={control}
					errors={errors}
				/>

				<Button title={t<string>('general.addNewList')} onPress={handleSubmit(setNewList)} />
				{backendError && <Text>{backendError}</Text>}
			</SafeAreaView>
		</ScrollView>
	);
};

export const Lists = ({ navigation }: { navigation: any }) => (
	<ContextProvider navigation={navigation}>
		<ListsWrapper navigation={navigation} />
	</ContextProvider>
);
