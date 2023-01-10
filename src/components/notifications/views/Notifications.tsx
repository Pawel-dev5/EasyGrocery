import React, { useCallback, useContext, useEffect, useState } from 'react';
import { t } from 'i18next';
import { RefreshControl, ScrollView, Text, TouchableOpacity } from 'react-native';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';
import { ContextProvider, ListsContextData } from 'components/lists/hooks/useList';

// HOOKS
import { useNotifications } from 'components/notifications/hooks/useNotifications';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { Notification } from 'components/notifications/sections';

// MODELS
import { NotificationInterface } from 'components/notifications/models/views';

// STYLES
import { StyledNotificationsWrapper, StyledFiltersWrapper } from 'components/notifications/views/Styles';

const NotificationsWrapper = (props: any) => {
	const { user, notifications, setNotifications, socket } = useContext(GlobalContextData);

	const { addNewListFromNofitication } = useContext(ListsContextData);

	const {
		showAll,
		filteredNotifications,
		loadingNotifications,
		getNotifications,
		filterNotifications,
		setShowAll,
		updateRead,
		acceptNotification,
		rejectNotification,
		deleteNotification,
	} = useNotifications({ user, addNewListFromNofitication, notifications, setNotifications, socket });

	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		getNotifications();
	}, []);

	const onRefresh = useCallback(async () => {
		await setRefreshing(true);
		await getNotifications();
		await setRefreshing(false);
	}, []);

	return (
		<AppWrapper {...props?.props} routeName={t('notifications.title')} isLoading={loadingNotifications}>
			<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<StyledFiltersWrapper>
					<TouchableOpacity
						onPress={() => {
							filterNotifications();
							setShowAll(!showAll);
						}}
					>
						{!showAll ? <Text>{t<string>('notifications.showAll')}</Text> : <Text>{t('notifications.allUnRead')}</Text>}
					</TouchableOpacity>

					<Text>{t<string>('notifications.allRead')}</Text>
				</StyledFiltersWrapper>

				{notifications && notifications?.length > 0 && (
					<StyledNotificationsWrapper>
						{filteredNotifications?.map((item: NotificationInterface) => (
							<Notification
								key={item?.id}
								item={item}
								updateRead={updateRead}
								acceptNotification={acceptNotification}
								rejectNotification={rejectNotification}
								deleteNotification={deleteNotification}
							/>
						))}
					</StyledNotificationsWrapper>
				)}
			</ScrollView>
		</AppWrapper>
	);
};

export const Notifications = (props: any) => {
	const { lists, setLists, socket, setSocket } = useContext(GlobalContextData);

	return (
		<ContextProvider setLists={setLists} lists={lists} socket={socket} setSocket={setSocket}>
			<NotificationsWrapper props={props} />
		</ContextProvider>
	);
};
