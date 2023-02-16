import { Animated } from 'react-native';

// MODELS
import { UseSearchBarAnimatonInterface } from 'components/layout/models/hooks';

export const useSearchBarAnimation = ({
	fontSize,
	borderRadius,
	borderWidth,
	backgroundColourIndex,
	borderColourIndex,
	paddingX,
}: UseSearchBarAnimatonInterface) => {
	const baseAnimation = { duration: 500, useNativeDriver: false };

	const animationElements = [
		{ ref: fontSize, toValue: 16, ...baseAnimation },
		{ ref: borderRadius, toValue: 16, ...baseAnimation },
		{ ref: borderWidth, toValue: 1, ...baseAnimation },
		{ ref: backgroundColourIndex, toValue: 1, ...baseAnimation },
		{ ref: borderColourIndex, toValue: 1, ...baseAnimation },
		{ ref: paddingX, toValue: 12, ...baseAnimation },
	];

	const reverseAnimationElements = [
		{ ref: fontSize, toValue: 22, ...baseAnimation },
		{ ref: borderRadius, toValue: 0, ...baseAnimation },
		{ ref: borderWidth, toValue: 0, ...baseAnimation },
		{ ref: backgroundColourIndex, toValue: 0, ...baseAnimation },
		{ ref: borderColourIndex, toValue: 0, ...baseAnimation },
		{ ref: paddingX, toValue: 0, ...baseAnimation },
	];

	const animationOnStart = () => {
		const newArr: any = [];

		animationElements?.forEach((item) => {
			newArr?.push(
				Animated.timing(item?.ref, {
					...item,
				}),
			);
		});

		return newArr;
	};
	const animationOnReverse = () => {
		const newArr: any = [];

		reverseAnimationElements?.forEach((item) => {
			newArr?.push(
				Animated.timing(item?.ref, {
					...item,
				}),
			);
		});

		return newArr;
	};

	return { animationOnReverse, animationOnStart };
};
