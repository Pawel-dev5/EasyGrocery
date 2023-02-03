import React from 'react';
import { t } from 'i18next';
import { ScrollView } from 'react-native';

// REDUX
import { useAppDispatch } from 'redux/hooks';
import { globalDeleteAlert } from 'redux/slices/global';

// MODELS
import { AlertsInterface } from 'redux/slices/global/models';

// STYLES
import { StyledAlertMessage, StyledAlertWrapper, StyledCircleWrapper } from 'components/layout/sections/Styles';

// COMPONENTS
import { CircleProgressBar } from 'components/layout/common/index';

export const Alert = ({ id, message, name, status, bottomSheet, type }: AlertsInterface) => {
	const dispatch = useAppDispatch();

	return (
		<StyledAlertWrapper type={type} bottomSheet={bottomSheet || false}>
			<ScrollView style={{ position: 'relative', maxWidth: '95%' }}>
				<StyledAlertMessage>
					{name} {status && `${status}:`} {message || t('general.error')}
				</StyledAlertMessage>

				<StyledCircleWrapper>
					<CircleProgressBar onFinish={() => dispatch(globalDeleteAlert(id))} />
				</StyledCircleWrapper>
			</ScrollView>
		</StyledAlertWrapper>
	);
};
