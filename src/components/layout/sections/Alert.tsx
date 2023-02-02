import React from 'react';
import { TouchableOpacity } from 'react-native';

// REDUX
import { useAppDispatch } from 'redux/hooks';
import { globalDeleteAlert } from 'redux/slices/global';

// MODELS
import { AlertsInterface } from 'redux/slices/global/models';

// STYLES
import { StyledAlertMessage, StyledAlertWrapper } from 'components/layout/sections/Styles';

// COMPONENTS
import { Icon } from 'components/layout/common/index';
import { t } from 'i18next';

export const Alert = ({ id, message, name, status, bottomSheet, type }: AlertsInterface) => {
	const dispatch = useAppDispatch();

	return (
		<StyledAlertWrapper type={type} bottomSheet={bottomSheet || false}>
			<StyledAlertMessage>
				{name} {status && `${status}:`} {message || t('general.error')}
			</StyledAlertMessage>
			{/* <CircleProgressBar id={id} onFinish={() => dispatch(globalDeleteAlert(id))}> */}
			<TouchableOpacity onPress={() => dispatch(globalDeleteAlert(id))}>
				<Icon name="times" size={15} />
			</TouchableOpacity>
			{/* </CircleProgressBar> */}
		</StyledAlertWrapper>
	);
};
