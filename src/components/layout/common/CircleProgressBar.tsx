/* eslint-disable import/no-duplicates */
import React, { useEffect, useState } from 'react';
import Svg, { Circle } from 'react-native-svg';
import Figure from 'react-native-svg';

// COMPONENTS
import { Icon } from 'components/layout/common/Icon';

// STYLES
import { StyledCircleProgressWrapper, StyledIconWrapper } from 'components/layout/common/Styles';

// UTILS
import theme from 'utils/theme/themeDefault';

export const CircleProgressBar = ({ onFinish }: { onFinish: () => void }) => {
	const [progress, setProgress] = useState(0);

	const circleConfig = {
		viewBox: '0 -10 100 100',
		cx: '40',
		cy: '40',
		radio: '45',
	};
	const daysDashArray = Number(circleConfig?.radio) * Math.PI * 2;
	const daysDashOffset = daysDashArray - (daysDashArray * progress) / 100;
	const loadingDuration = 10000;

	useEffect(() => {
		const loadingTimeout = setTimeout(() => setProgress(progress + 1), loadingDuration / 100);
		return () => {
			clearTimeout(loadingTimeout);
		};
	}, [progress]);

	if (progress === 100) {
		setTimeout(() => {
			onFinish();
			setProgress(0);
		}, 300);
	}

	return (
		<StyledCircleProgressWrapper
			onPress={() => {
				onFinish();
				setProgress(0);
			}}
		>
			<Figure width={30}>
				<Svg viewBox={circleConfig.viewBox} height={20} width={30}>
					<Circle
						stroke={theme.grey500}
						strokeWidth={10}
						fill="transparent"
						cx={circleConfig.cx}
						cy={circleConfig.cy}
						r={circleConfig.radio}
					/>

					<Circle
						stroke={theme.white}
						strokeWidth={10}
						fill="transparent"
						cx={circleConfig.cx}
						cy={circleConfig.cy}
						r={circleConfig.radio}
						strokeDasharray={daysDashArray}
						strokeDashoffset={daysDashOffset}
					/>
				</Svg>
			</Figure>

			<StyledIconWrapper>
				<Icon name="times" size={11} variant="white" />
			</StyledIconWrapper>
		</StyledCircleProgressWrapper>
	);
};
