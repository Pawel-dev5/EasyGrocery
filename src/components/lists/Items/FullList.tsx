import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { t } from 'i18next';

// CONTEXT
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';
import { GlobalContextData } from 'config/useGlobalContext';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { Icon, Input, ProgressBar } from 'components/layout/common';

// STYLES
import {
	StyledActionButton,
	StyledAddItemButton,
	StyledAddNewItem,
	StyledFullListWrapper,
	StyledInputTitleWrapper,
	StyledItemsWrapper,
	StyledItemTitle,
	StyledItemTitleWrapper,
	StyledListBackground,
	StyledListCardItemElement,
	StyledListItemsOptions,
	StyledListItemsWrapper,
	StyledListOptionWrapper,
	StyledListTitle,
	StyledUsersCounter,
	StyledUsersWrapper,
} from 'components/lists/items/Styles';
import { shadowInline } from 'utils/theme/themeDefault';

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
		const { id, title, users_permissions_users, items } = singleList;
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
								<View>
									{singleListEditable?.isEdited === 'title' ? (
										<Input
											value={singleListEditable?.value?.title!}
											name="title"
											placeholder="title"
											textContentType="nickname"
											onChange={(text) => setEditedValue(text as unknown as string)}
										/>
									) : (
										<StyledListTitle>{title}</StyledListTitle>
									)}
									<StyledUsersWrapper>
										<StyledListCardItemElement>
											<Icon name="users" size={20} />
										</StyledListCardItemElement>
										<StyledListCardItemElement>
											<StyledUsersCounter>{users_permissions_users?.data?.length}</StyledUsersCounter>
										</StyledListCardItemElement>
									</StyledUsersWrapper>
								</View>
								<StyledListOptionWrapper>
									<StyledActionButton
										onPress={() => {
											if (singleListEditable?.isEdited === 'title') {
												editSingleListTitle();
											} else setIsEdited(title);
										}}
									>
										<Icon name={singleListEditable?.isEdited === 'title' ? 'check' : 'edit'} size={20} />
									</StyledActionButton>

									<StyledActionButton onPress={() => editSingleListItems('clear', id!)}>
										<Icon name="broom" size={20} />
									</StyledActionButton>
									<StyledActionButton onPress={() => deleteList(id!)}>
										<Icon name="trash" size={20} />
									</StyledActionButton>
								</StyledListOptionWrapper>
							</StyledInputTitleWrapper>

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
									<StyledListItemsWrapper key={item?.id}>
										<StyledItemTitleWrapper>
											<TouchableOpacity onPress={() => editSingleListItems('update', item.id)}>
												<Icon variant={item?.done ? 'done' : 'unDone'} name="check-circle" size={30} />
											</TouchableOpacity>

											<StyledItemTitle>{item?.value}</StyledItemTitle>
										</StyledItemTitleWrapper>

										<StyledListItemsOptions>
											<TouchableOpacity onPress={() => console.log('elo')}>
												<Icon name="edit" size={20} />
											</TouchableOpacity>

											<TouchableOpacity onPress={() => editSingleListItems('delete', item.id)}>
												<Icon name="trash" size={20} />
											</TouchableOpacity>
										</StyledListItemsOptions>
									</StyledListItemsWrapper>
								))}
							</ScrollView>
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
