import React from 'react';

// COMPONENTS
import { InputInterface } from 'components/layout/models/common';

// STYLES
import { StyledInput } from 'components/layout/common/Styles';

export const Input = ({
	value,
	onChange,
	onBlur,
	placeholder,
	keyboardType = 'default',
	textContentType,
	autoComplete,
	ariaInvalid,
	name,
}: InputInterface) => (
	<StyledInput
		name={name}
		onBlur={onBlur}
		onChangeText={onChange}
		value={value}
		placeholder={placeholder}
		keyboardType={keyboardType}
		textContentType={textContentType}
		autoComplete={autoComplete}
		aria-invalid={ariaInvalid}
	/>
);
