import React from 'react';
import { Text } from 'react-native';

// STYLES
import {
	StyledProgressBarContainer,
	StyledProgressBarBackground,
	StyledProgressBarProgress,
	StyledProgressBarWrapper,
	StyledProgressBarCounter,
} from 'components/layout/common/Styles';

// MODELS
import { ItemInterface } from 'components/lists/models/sections';

export const ProgressBar = ({ items }: { items: ItemInterface[] }) => {
	const doneItems = items?.filter(({ done }) => done === true)?.length;

	return (
		<StyledProgressBarWrapper>
			<StyledProgressBarContainer>
				<StyledProgressBarBackground />
				<StyledProgressBarProgress percent={(100 * doneItems) / items?.length} />
			</StyledProgressBarContainer>

			<StyledProgressBarCounter>
				<Text>
					{doneItems}/{items?.length}
				</Text>
			</StyledProgressBarCounter>
		</StyledProgressBarWrapper>
	);
};
