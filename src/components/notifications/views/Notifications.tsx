import React, { useContext, useEffect } from 'react';
import { t } from 'i18next';
import { Text, TouchableOpacity } from 'react-native';

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

	useEffect(() => {
		getNotifications();
	}, []);

	return (
		<AppWrapper {...props?.props} routeName={t('notifications.title')} isLoading={loadingNotifications}>
			<StyledFiltersWrapper>
				<TouchableOpacity
					onPress={() => {
						filterNotifications();
						setShowAll(!showAll);
					}}
				>
					{!showAll ? <Text>{t('notifications.showAll')}</Text> : <Text>{t('notifications.allUnRead')}</Text>}
				</TouchableOpacity>

				<Text>{t('notifications.allRead')}</Text>
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
