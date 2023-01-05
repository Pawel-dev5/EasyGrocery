import { Alert } from 'react-native';

interface SubmitAlertInterface {
	okPressed: any;
	cancelPressed: any;
	okText: string;
	cancelText: string;
	alertTitle: string;
	alertMessage: string;
}

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
