// MODELS
import React from 'react';
import { StyledIcon } from 'components/layout/common/Styles';
import { VariantType } from 'components/layout/models/common';

// STYLES

export const Icon = ({ name, variant, size }: { name: string; variant?: VariantType; size?: number }) => (
	<StyledIcon variant={variant} name={name} size={size} />
);
