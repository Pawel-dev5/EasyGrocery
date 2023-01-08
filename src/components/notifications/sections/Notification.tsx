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

export const Notification = ({
	item,
	updateRead,
	acceptNotification,
	rejectNotification,
	deleteNotification,
}: NotificationComponentInterface) => {
	const [loadingRead, setLoadingRead] = useState(false);
	const [loadingUpdate, setLoadingUpdate] = useState(false);
	const [loadingDelete, setLoadingDelete] = useState(false);

	const variantHandler = (read: boolean, sendRequest: boolean, type: string) => {
		if (!read && !sendRequest) return 'UNREAD';
		if (read && !sendRequest) return 'SENDREQUEST';
		if (type === 'accept' && !read) return 'ACCEPT';
		if (type === 'reject' && !read) return 'REJECT';
		return null;
	};

	if (item?.attributes) {
		const {
			id,
			attributes: { read, sender, list, createdAt, sendRequest, type },
		} = item;

		const imgHandler = () => {
			switch (type) {
				case 'reject':
					return <StyledInviteImg source={require('../../../assets/reject.png')} resizeMode="cover" style={shadowInline} />;
				case 'accept':
					return <StyledInviteImg source={require('../../../assets/check.png')} resizeMode="cover" style={shadowInline} />;
				case 'invitation':
					return <StyledInviteImg source={require('../../../assets/invite.png')} resizeMode="cover" style={shadowInline} />;
				default:
					return null;
			}
		};

		const titleHandler = () => {
			switch (type) {
				case 'reject':
					return t('notifications.invitationReject');
				case 'accept':
					return t('notifications.invitationAccepted');
				case 'invitation':
					return t('notifications.invitationList');
				default:
					return null;
			}
		};

		return (
			<Swipeable
				renderRightActions={() =>
					sendRequest && (
						<RightSwipeDelete
							onClick={() => deleteNotification(id, (status) => setLoadingDelete(status))}
							loader={loadingDelete}
						/>
					)
				}
			>
				<StyledNotificationWrapper variant={variantHandler(read, sendRequest, type)} style={shadowInline}>
					<StyledNotification read={variantHandler(read, sendRequest, type)}>
						<StyledNotificationBody>
							{imgHandler()}

							<View>
								<StyledNotificationInfoWrapper title>
									<StyledNotificationInfoTitle title>{titleHandler()}</StyledNotificationInfoTitle>
								</StyledNotificationInfoWrapper>

								<StyledNotificationInfoWrapper>
									<Icon name="user" size={15} />
									<StyledNotificationInfoTitle>{sender?.data?.attributes?.username}</StyledNotificationInfoTitle>
								</StyledNotificationInfoWrapper>

								<StyledNotificationInfoWrapper>
									<Icon name="list" size={15} />
									<StyledNotificationInfoTitle>{list?.data?.attributes?.title}</StyledNotificationInfoTitle>
								</StyledNotificationInfoWrapper>

								<StyledNotificationInfoWrapper>
									<Icon name="calendar-alt" size={15} />
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
									<>{!read ? <Icon name="eye-slash" size={15} /> : <Icon name="eye" size={15} />}</>
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

										<StyledButton
											variant="delete"
											onPress={() => rejectNotification(item, (status) => setLoadingUpdate(status))}
										>
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
