import React, { useState } from 'react';

// COMPONENTS
import { Icon, Loader } from 'components/layout/common';

// STYLES
import {
	StyledListContainer,
	StyledListButtonText,
	StyledButtonContainer,
	StyledListCover,
	StyledListWrapper,
	StyledTitleWrapper,
	StyledListButtonDescription,
} from 'components/shops/sections/Styles';

// HELPERS
import { findObjectInArray } from 'utils/helpers/arrayHelpers';

// MODELS
import { BottomSheetRenderItemInterface } from 'components/shops/models/sections';

export const BottomSheetRenderItem = ({ item, bottomSheetState, addProductToList }: BottomSheetRenderItemInterface) => {
	const [addListLoader, setAddListLoader] = useState(false);
	const findElement = findObjectInArray(item?.items, 'title', bottomSheetState.product?.title?.trim());

	return (
		<StyledListContainer>
			<StyledListWrapper>
				{item?.shop?.image?.url && (
					<StyledListCover source={{ uri: item?.shop?.image?.url }} style={[{ resizeMode: 'cover' }]} />
				)}

				<StyledTitleWrapper>
					<StyledListButtonText>{item?.title}</StyledListButtonText>
					{item?.description && <StyledListButtonDescription>{item?.description}</StyledListButtonDescription>}
				</StyledTitleWrapper>
			</StyledListWrapper>

			<StyledButtonContainer
				variant={findElement ? 'done' : 'black'}
				onPress={() => {
					setAddListLoader(true);
					addProductToList({
						list: item,
						product: bottomSheetState?.product,
						callbackOnSuccess: () => setAddListLoader(false),
					});
				}}
				disabled={!!findElement || addListLoader}
			>
				{addListLoader ? (
					<Loader size={16} />
				) : (
					<Icon name={findElement ? 'check' : 'plus'} size={16} variant={findElement ? 'done' : 'black'} />
				)}
			</StyledButtonContainer>
		</StyledListContainer>
	);
};
