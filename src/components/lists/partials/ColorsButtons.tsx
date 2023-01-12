import React from 'react';

// MODELS
import { ColorButtonsInterface } from 'components/lists/models/partials';

// STYLES
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

export const ColorsButtons = ({ setValue, value, setNewColor }: ColorButtonsInterface) => (
	<StyledRadioButtonWrapper>
		{buttons?.map(({ id, color }) => (
			<StyledRadioButton
				key={id}
				color={color}
				onPress={() => {
					setValue('color', color);
					setNewColor(color);
				}}
				style={
					color === value
						? [
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
