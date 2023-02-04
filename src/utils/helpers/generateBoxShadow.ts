import { Platform } from 'react-native';

export const generateBoxShadowStyle = (
	xOffset: number,
	yOffset: number,
	shadowColorIos: string,
	shadowOpacity: number,
	shadowRadius: number,
	elevation: number,
	shadowColorAndroid: string,
) => {
	let styles = {};
	if (Platform.OS === 'ios') {
		styles = {
			shadowColor: shadowColorIos,
			shadowOffset: { width: xOffset, height: yOffset },
			shadowOpacity,
			shadowRadius,
		};
	} else if (Platform.OS === 'android') {
		styles = {
			elevation,
			shadowColor: shadowColorAndroid,
			shadowOffset: { width: xOffset, height: yOffset },
			shadowOpacity,
			shadowRadius,
		};
	}
	return { ...styles };
};
