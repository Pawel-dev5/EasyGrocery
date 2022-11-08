import React, { useContext } from 'react';
import { Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { TapGestureHandler } from 'react-native-gesture-handler';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// ROUTER
import { lists as listRoute } from 'routes/AppRoutes';

// COMPONENTS
import { Icon, ProgressBar } from 'components/layout/common';
import { RightSwipeDelete } from 'components/lists/elements';

// STYLES
import {
	StyledListCard,
	StyledListCardItem,
	StyledListCardTitleWrapper,
	StyledListCardTitle,
	StyledListCardItemElement,
} from 'components/lists/items/Styles';
import { shadowInline } from 'utils/theme/themeDefault';

export const ShortList = (props: any) => {
	const { deleteList } = useContext(ListsContextData);
	const { navigation, title, users_permissions_users, items, id, type, color } = props;

	return (
		<Swipeable renderRightActions={() => <RightSwipeDelete onClick={() => deleteList(id)} />}>
			<TapGestureHandler onHandlerStateChange={() => navigation?.navigate(listRoute.singleList, { id })}>
				<StyledListCard type={type} style={shadowInline} color={color}>
					<StyledListCardTitleWrapper>
						<StyledListCardTitle>{title}</StyledListCardTitle>

						<StyledListCardItem>
							<StyledListCardItemElement>
								<Icon name="users" size={15} />
							</StyledListCardItemElement>
							<StyledListCardItemElement>
								<Text>{users_permissions_users?.length}</Text>
							</StyledListCardItemElement>
						</StyledListCardItem>
					</StyledListCardTitleWrapper>

					<ProgressBar items={items} />
				</StyledListCard>
			</TapGestureHandler>
		</Swipeable>
	);
};
