import { Platform } from 'react-native';

export const generateBoxShadowStyle = (
	xOffset: any,
	yOffset: any,
	shadowColorIos: any,
	shadowOpacity: any,
	shadowRadius: any,
	elevation: any,
	shadowColorAndroid: any,
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
		};
	}
	return { ...styles };
};
