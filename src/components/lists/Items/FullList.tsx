import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { t } from 'i18next';

// CONTEXT
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';
import { GlobalContextData } from 'config/useGlobalContext';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { Icon, Input, ProgressBar } from 'components/layout/common';
import { Item } from 'components/lists/elements';

// STYLES
import {
	StyledActionButton,
	StyledAddItemButton,
	StyledAddNewItem,
	StyledFullListWrapper,
	StyledInputTitleWrapper,
	StyledItemsWrapper,
	StyledListBackground,
	StyledListCardItemElement,
	StyledListOptionWrapper,
	StyledListTitle,
	StyledUsersCounter,
	StyledUsersWrapper,
	StyledListDescription,
} from 'components/lists/items/Styles';

export const FullListWrapper = (props: any) => {
	const {
		singleList,
		singleListEditable,
		getList,
		deleteList,
		addNewListItem,
		editSingleListTitle,
		setIsEdited,
		setEditedValue,
		editSingleListItems,
		setShowDone,
		filteredItems,
		showDone,
		isLoading,
		setIsLoading,
		editedSingleList,
		setEditedSingleList,
	} = useContext(ListsContextData);
	const { lang, setLang } = useContext(GlobalContextData);
	const listUuid = props?.route?.params?.id;

	useEffect(() => {
		if (listUuid) {
			setIsLoading(true);
			getList(listUuid);
		}
	}, []);

	if (singleList) {
		const { id, title, users_permissions_users, items, descriptrion } = singleList;
		const listItems = filteredItems || items;

		return (
			<>
				<AppWrapper
					{...props}
					isLoading={isLoading}
					routeName={t('general.myLists')}
					lang={lang}
					setLang={setLang}
					customPadding="0"
				>
					<StyledListBackground>
						<StyledFullListWrapper>
							<StyledInputTitleWrapper>
								<StyledListTitle>{title}</StyledListTitle>

								<StyledListOptionWrapper>
									<StyledActionButton onPress={() => setEditedSingleList(editedSingleList === null ? singleList : null)}>
										<Icon name={editedSingleList !== null ? 'list' : 'edit'} size={20} />
									</StyledActionButton>

									<StyledActionButton onPress={() => editSingleListItems('clear', id!)}>
										<Icon name="broom" size={20} />
									</StyledActionButton>

									<StyledActionButton onPress={() => deleteList(id!)}>
										<Icon name="trash" size={20} />
									</StyledActionButton>
								</StyledListOptionWrapper>
							</StyledInputTitleWrapper>

							<StyledUsersWrapper>
								<StyledListCardItemElement>
									<Icon name="users" size={20} />
								</StyledListCardItemElement>

								<StyledListCardItemElement>
									<StyledUsersCounter>{users_permissions_users?.data?.length}</StyledUsersCounter>
								</StyledListCardItemElement>
							</StyledUsersWrapper>

							<StyledListDescription>
								{descriptrion ||
									'Donec rutrum congue leo eget malesuada. Nulla porttitor accumsan tincidunt. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla quis lorem'}
							</StyledListDescription>
							<ProgressBar items={items} />

							{(showDone !== 'done' || showDone === null) && (
								<TouchableOpacity onPress={() => setShowDone('done')}>
									<Text>Pokaż tylko zrobione</Text>
								</TouchableOpacity>
							)}

							{(showDone !== 'unDone' || showDone === null) && (
								<TouchableOpacity onPress={() => setShowDone('unDone')}>
									<Text>Pokaż tylko niezrobione</Text>
								</TouchableOpacity>
							)}

							{showDone !== null && (
								<TouchableOpacity onPress={() => setShowDone(null)}>
									<Text>Pokaż wszystko</Text>
								</TouchableOpacity>
							)}
						</StyledFullListWrapper>

						<StyledItemsWrapper>
							{editedSingleList ? (
								<View>
									<View>
										<Input
											value={editedSingleList?.title!}
											name="title"
											placeholder="title"
											textContentType="nickname"
											onChange={(text) => setEditedValue(text as unknown as string)}
										/>
										<StyledActionButton
											onPress={() => {
												if (singleListEditable?.isEdited === 'title') {
													editSingleListTitle();
												} else setIsEdited(title);
											}}
										>
											<Icon name={singleListEditable?.isEdited === 'title' ? 'check' : 'edit'} size={20} />
										</StyledActionButton>

										<Text>Opis</Text>
										<Text>Użytkownicy</Text>
										<Text>Wybierz kolor</Text>
									</View>
								</View>
							) : (
								<>
									<StyledAddNewItem>
										<Input
											value={singleListEditable?.value?.newItem.value!}
											name="title"
											placeholder="Add"
											textContentType="nickname"
											onKeyPress={(e) => console.log(e.nativeEvent)}
											onChange={(text) => addNewListItem(text)}
										/>

										<StyledAddItemButton onPress={() => editSingleListItems('add')}>
											<Icon name="plus" size={20} />
										</StyledAddItemButton>
									</StyledAddNewItem>

									<ScrollView>
										{listItems?.map((item) => (
											<Item key={item?.id} {...item} />
										))}
									</ScrollView>
								</>
							)}
						</StyledItemsWrapper>
					</StyledListBackground>
				</AppWrapper>
			</>
		);
	}
	return null;
};

export const FullList = (props: any) => (
	<ContextProvider>
		<FullListWrapper {...props} />
	</ContextProvider>
);
