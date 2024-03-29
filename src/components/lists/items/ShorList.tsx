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
import { generateBoxShadowStyle } from 'utils/helpers/generateBoxShadow';

// MODELS
import { ProgressBarVariant } from 'components/lists/models/sections';
import { View } from 'react-native';

export const ShortList = (props: any) => {
	const { deleteList, deleteListLoader, listsView } = useContext(ListsContextData);
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const { navigation, title, users_permissions_users, items, id, color, actualList, index } = props;

	// eslint-disable-next-line no-unsafe-optional-chaining
	const listsLength = actualList?.length + 1;
	return (
		<Swipeable
			renderRightActions={() => (
				<RightSwipeDelete
					onClick={() => deleteList(id)}
					loader={deleteListLoader}
					lastElement={index === listsLength}
					firstElement={index === 0}
				/>
			)}
		>
			<View
				style={{
					...generateBoxShadowStyle(-2, 4, '#171717', 0.3, 3, 4, '#171717'),
				}}
			>
				<TapGestureHandler onHandlerStateChange={() => navigation?.navigate(listRoute.singleList, { id })}>
					<StyledListCard color={color} lastElement={index === listsLength} firstElement={index === 0}>
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
			</View>
		</Swipeable>
	);
};
