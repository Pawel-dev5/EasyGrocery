import React from 'react';

// MODELS
import { VariantType } from 'components/layout/models/common';

// STYLES
import { StyledIcon } from 'components/layout/common/Styles';

export const Icon = ({ name, variant, size }: { name: string; variant?: VariantType; size?: number }) => (
	<StyledIcon variant={variant} name={name} size={size} />
);
