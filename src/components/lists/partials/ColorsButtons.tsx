import React from 'react';
import { Text } from 'react-native';
import { shadowInline } from 'utils/theme/themeDefault';
import { StyledRadioButtonWrapper, StyledRadioButton } from './Styles';

const buttons = [
	{
		id: 0,
		color: 'hsl(0, 0%, 90%)',
	},
	{
		id: 1,
		color: '#994ebc',
	},
	{
		id: 2,
		color: '#37664F',
	},
	{
		id: 3,
		color: '#EC5990',
	},
	{
		id: 4,
		color: '#E6D06C',
	},
	{
		id: 5,
		color: '#E8443F',
	},
];

const shadow = {
	shadowColor: '#000',
	shadowOffset: {
		width: 0,
		height: 12,
	},
	shadowOpacity: 0.58,
	shadowRadius: 16.0,

	elevation: 24,
};
export const ColorsButtons = ({ setValue, value }: { setValue: any; value: string | null | undefined }) => {
	const colorHandler = () => {};
	console.log(value);
	return (
		<StyledRadioButtonWrapper>
			{buttons?.map(({ id, color }) => (
				<StyledRadioButton
					key={id}
					color={color}
					// isPressed={color === 'hsl(0, 0%, 90%)'}
					onPress={() => setValue('color', color)}
					style={
						color === value
							? [
									shadow,
									{
										transform: [{ scale: 1.12 }],
									},
							  ]
							: null
					}
				/>
			))}
		</StyledRadioButtonWrapper>
	);
};
