import { Alert } from 'react-native';

// MODELS
import { SubmitAlertInterface } from 'components/lists/models/partials';

export const SubmitAlert = ({
	okPressed,
	cancelPressed,
	cancelText,
	okText,
	alertTitle,
	alertMessage,
}: SubmitAlertInterface) =>
	Alert.alert(alertTitle, alertMessage, [
		{
			text: cancelText,
			onPress: () => cancelPressed(),
			style: 'cancel',
		},
		{ text: okText, onPress: () => okPressed() },
	]);
