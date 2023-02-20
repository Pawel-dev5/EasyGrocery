import React from 'react';

// COMPONENTS
import { InputInterface } from 'components/layout/models/common';

// STYLES
import { StyledInput } from 'components/layout/common/Styles';

export const Input = ({
	value,
	onChangeText,
	onBlur,
	placeholder,
	keyboardType = 'default',
	textContentType,
	autoComplete,
	ariaInvalid,
	name,
	type = 'text',
	onKeyPress,
	autoFocus,
	onSubmitEditing,
	onFocus,
	inputRef,
	blurOnSubmit,
	customStyle,
	placeholderTextColor,
	editable,
	globalSearch = false,
}: InputInterface) => (
	<StyledInput
		ref={inputRef}
		key={name}
		onBlur={onBlur}
		onChangeText={onChangeText}
		value={value}
		placeholder={placeholder}
		keyboardType={keyboardType}
		textContentType={textContentType}
		autoComplete={autoComplete}
		aria-invalid={ariaInvalid}
		secureTextEntry={type === 'password'}
		onKeyPress={onKeyPress}
		autoFocus={autoFocus}
		onSubmitEditing={onSubmitEditing}
		clearButtonMode="while-editing"
		returnKeyType="search"
		blurOnSubmit={blurOnSubmit}
		onFocus={onFocus}
		placeholderTextColor={placeholderTextColor}
		editable={editable}
		style={customStyle}
		globalSearch={globalSearch}
	/>
);
