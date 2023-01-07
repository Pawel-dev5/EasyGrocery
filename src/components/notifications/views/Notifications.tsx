import React, { useContext, useEffect } from 'react';
import { t } from 'i18next';
import { Text, TouchableOpacity } from 'react-native';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

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
	const { user, lang, setLang } = useContext(GlobalContextData);

	const {
		notifications,
		showAll,
		filteredNotifications,
		loadingNotifications,
		getNotifications,
		filterNotifications,
		setShowAll,
		updateRead,
		acceptNotification,
	} = useNotifications({ user });

	useEffect(() => {
		getNotifications();
	}, []);

	return (
		<AppWrapper
			routeName={t('notifications.title')}
			{...props}
			lang={lang}
			setLang={setLang}
			isLoading={loadingNotifications}
		>
			<StyledFiltersWrapper>
				<TouchableOpacity
					onPress={() => {
						filterNotifications();
						setShowAll(!showAll);
					}}
				>
					{showAll ? <Text>Show all</Text> : <Text>Show unread</Text>}
				</TouchableOpacity>

				<Text>Mark all as read</Text>
			</StyledFiltersWrapper>

			{notifications && notifications?.length > 0 && (
				<StyledNotificationsWrapper>
					{filteredNotifications?.map((item: NotificationInterface) => (
						<Notification key={item?.id} item={item} updateRead={updateRead} acceptNotification={acceptNotification} />
					))}
				</StyledNotificationsWrapper>
			)}
		</AppWrapper>
	);
};
