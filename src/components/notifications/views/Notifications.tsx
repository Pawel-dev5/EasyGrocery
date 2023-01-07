import React, { useContext, useEffect } from 'react';
import { t } from 'i18next';
import { View, Text } from 'react-native';

// CONTEXT
import { GlobalContextData } from 'config/useGlobalContext';

// HOOKS
import { useNotifications } from 'components/notifications/hooks/useNotifications';

// COMPONENTS
import { AppWrapper } from 'components/layout';

export const Notifications = (props: any) => {
	const { user, lang, setLang } = useContext(GlobalContextData);

	const { notifications, getNotifications } = useNotifications({ user });

	useEffect(() => {
		getNotifications();
	}, []);

	return (
		<AppWrapper routeName={t('notifications.title')} {...props} lang={lang} setLang={setLang}>
			{notifications && notifications?.length > 0 && (
				<View>
					{notifications?.map(({ id, attributes }) => (
						<View key={id}>
							<Text>Zaproszenie do listy</Text>
							<Text>{attributes?.list?.data?.attributes?.title}</Text>
							<Text>Wysłane przez</Text>
							<Text>{attributes?.sender?.data?.attributes?.email}</Text>
							<Text>{attributes?.sender?.data?.attributes?.username}</Text>
						</View>
					))}
				</View>
			)}
		</AppWrapper>
	);
};
