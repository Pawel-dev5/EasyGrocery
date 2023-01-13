import React, { useContext } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { TapGestureHandler } from 'react-native-gesture-handler';

// CONTEXT
import { ListsContextData } from 'components/lists/hooks/useList';

// ROUTER
import { lists as listRoute } from 'routes/AppRoutes';

// COMPONENTS
import { Icon, ProgressBar } from 'components/layout/common';
import { RightSwipeDelete } from 'components/layout/elements';

// STYLES
import {
	StyledListCard,
	StyledListCardItem,
	StyledListCardTitleWrapper,
	StyledListCardTitle,
	StyledUserCounter,
} from 'components/lists/items/Styles';

// UTILS
import { shadowInline } from 'utils/theme/themeDefault';

// MODELS
import { ProgressBarVariant } from 'components/lists/models/sections';

export const ShortList = (props: any) => {
	const { deleteList, deleteListLoader, listsView } = useContext(ListsContextData);
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const { navigation, title, users_permissions_users, items, id, color, lists, setLists, index } = props;

	// eslint-disable-next-line no-unsafe-optional-chaining
	const listsLength = lists?.length + 1;
	return (
		<Swipeable
			renderRightActions={() => (
				<RightSwipeDelete
					onClick={() => deleteList(id, lists, setLists)}
					loader={deleteListLoader}
					lastElement={index === listsLength}
					firstElement={index === 0}
				/>
			)}
		>
			<TapGestureHandler onHandlerStateChange={() => navigation?.navigate(listRoute.singleList, { id })}>
				<StyledListCard style={shadowInline} color={color} lastElement={index === listsLength} firstElement={index === 0}>
					<StyledListCardTitleWrapper>
						<StyledListCardTitle>{title}</StyledListCardTitle>

						<StyledListCardItem>
							<Icon name="users" size={15} />

							<StyledUserCounter>
								{users_permissions_users?.length || users_permissions_users?.data?.length}
							</StyledUserCounter>
						</StyledListCardItem>
					</StyledListCardTitleWrapper>

					<ProgressBar items={items} variant={listsView ? ProgressBarVariant.LONG : ProgressBarVariant.SHORT} />
				</StyledListCard>
			</TapGestureHandler>
		</Swipeable>
	);
};
