// MODELS
import React from 'react';
import { StyledIcon } from 'components/layout/items/Styles';
import { VariantType } from 'components/layout/models/items';

// STYLES

export const Icon = ({ name, variant, size }: { name: string; variant?: VariantType; size?: number }) => (
	<StyledIcon variant={variant} name={name} size={size} />
);
