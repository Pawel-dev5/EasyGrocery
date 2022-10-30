import React from 'react';
import { Input } from 'components/layout/common';
import { Controller } from 'react-hook-form';
import { InputInterface } from 'components/layout/models/common';
import { Text } from 'react-native';
import { t } from 'i18next';

interface ControllerInterface extends InputInterface {
	control: any;
	errors: any;
}

export const ControllerWrapper = ({
	control,
	errors,
	name,
	keyboardType = 'default',
	autoComplete,
	textContentType,
	placeholder,
	type,
}: ControllerInterface) => (
	<>
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, onBlur, value } }) => (
				<Input
					type={type}
					placeholder={placeholder}
					keyboardType={keyboardType}
					textContentType={textContentType}
					autoComplete={autoComplete}
					aria-invalid={errors[name] ? 'true' : 'false'}
					onBlur={onBlur}
					onChange={onChange}
					value={value}
					name={name}
				/>
			)}
		/>

		{errors[name] && errors[name]?.type === 'required' && (
			<Text>
				{t<string>('general.field')} {placeholder?.toLocaleLowerCase()} {t<string>('auth.required')}
			</Text>
		)}

		{errors[name] && errors[name]?.type !== 'required' && <Text>{errors[name]?.message}</Text>}
	</>
);
