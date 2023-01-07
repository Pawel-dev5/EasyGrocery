import React, { useState } from 'react';
import { View } from 'react-native';
import { format } from 'date-fns-tz';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// COMPONENTS
import { Icon, Loader } from 'components/layout/common';
import { RightSwipeDelete } from 'components/layout/elements';

// MODELS
import { NotificationComponentInterface } from 'components/notifications/models/sections';

// STYLES
import {
	StyledNotification,
	StyledNotificationWrapper,
	StyledInviteImg,
	StyledNotificationInfoWrapper,
	StyledNotificationInfoTitle,
	StyledReadWrapper,
	StyledButtonWrapper,
	StyledButton,
	StyledButtonText,
	StyledNotificationBody,
} from 'components/notifications/sections/Styles';

// HELPERS
import { shadowInline } from 'utils/theme/themeDefault';
import { t } from 'i18next';

export const Notification = ({ item, updateRead, acceptNotification }: NotificationComponentInterface) => {
	const [loadingRead, setLoadingRead] = useState(false);
	const [loadingUpdate, setLoadingUpdate] = useState(false);

	const variantHandler = (read: boolean, sendRequest: boolean) => {
		if (!read && !sendRequest) return 'UNREAD';
		if (read && !sendRequest) return 'SENDREQUEST';
		return null;
	};

	if (item?.attributes) {
		const {
			id,
			attributes: { read, sender, list, createdAt, sendRequest },
		} = item;

		return (
			<Swipeable renderRightActions={() => sendRequest && <RightSwipeDelete onClick={() => {}} loader={false} />}>
				<StyledNotificationWrapper variant={variantHandler(read, sendRequest)} style={shadowInline}>
					<StyledNotification read={variantHandler(read, sendRequest)}>
						<StyledNotificationBody>
							<StyledInviteImg source={require('../../../assets/invite.png')} resizeMode="cover" style={shadowInline} />

							<View>
								<StyledNotificationInfoWrapper>
									<Icon name="user" size={15} />
									<StyledNotificationInfoTitle>{sender?.data?.attributes?.username}</StyledNotificationInfoTitle>
								</StyledNotificationInfoWrapper>

								<StyledNotificationInfoWrapper>
									<Icon name="list" size={15} />
									<StyledNotificationInfoTitle>{list?.data?.attributes?.title}</StyledNotificationInfoTitle>
								</StyledNotificationInfoWrapper>

								<StyledNotificationInfoWrapper>
									<Icon name="calendar" size={15} />
									<StyledNotificationInfoTitle>{format(new Date(createdAt), 'd-MM-yyy HH:mm')}</StyledNotificationInfoTitle>
								</StyledNotificationInfoWrapper>
							</View>

							<StyledReadWrapper
								onPress={() => {
									if (updateRead) updateRead(id, item, (status) => setLoadingRead(status));
								}}
							>
								{loadingRead ? (
									<Loader size={10} />
								) : (
									<>{read ? <Icon name="eye-slash" size={15} /> : <Icon name="eye" size={15} />}</>
								)}
							</StyledReadWrapper>
						</StyledNotificationBody>

						{!sendRequest && (
							<StyledButtonWrapper>
								{loadingUpdate ? (
									<Loader size={10} />
								) : (
									<>
										<StyledButton onPress={() => acceptNotification(item, (status) => setLoadingUpdate(status))}>
											<StyledButtonText>{t('general.accept')}</StyledButtonText>
										</StyledButton>

										<StyledButton variant="delete">
											<StyledButtonText>{t('general.reject')}</StyledButtonText>
										</StyledButton>
									</>
								)}
							</StyledButtonWrapper>
						)}
					</StyledNotification>
				</StyledNotificationWrapper>
			</Swipeable>
		);
	}
	return null;
};
