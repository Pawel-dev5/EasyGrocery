import React, { useCallback, useEffect, useState } from 'react';
import { t } from 'i18next';
import { RefreshControl, ScrollView, Text, TouchableOpacity } from 'react-native';

// REDUX
import { selectNotifications } from 'redux/slices/notifications';
import { useAppSelector } from 'redux/hooks';

// HOOKS
import { useNotifications } from 'components/notifications/hooks/useNotifications';

// COMPONENTS
import { AppWrapper } from 'components/layout';
import { Notification } from 'components/notifications/sections';

// MODELS
import { NotificationInterface } from 'components/notifications/models/views';

// STYLES
import { StyledNotificationsWrapper, StyledFiltersWrapper } from 'components/notifications/views/Styles';

export const Notifications = (props: any) => {
	const notificationsState = useAppSelector(selectNotifications);
	const notifications = notificationsState?.items;

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
	} = useNotifications();

	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		getNotifications();
	}, []);

	const updateRefresh = async (value: boolean) => setRefreshing(value);

	const onRefresh = useCallback(async () => {
		await updateRefresh(true);
		await getNotifications();
		await updateRefresh(false);
	}, []);

	const { props: newProps } = props;

	return (
		<AppWrapper {...newProps} routeName={t('notifications.title')} isLoading={loadingNotifications}>
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

					{/* <Text>{t<string>('notifications.allRead')}</Text> */}
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
