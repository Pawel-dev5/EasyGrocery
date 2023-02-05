import { darken, transparentize, lighten } from 'polished';

interface Polished {
	amount?: number;
	color?: string;
}
export const shadowInline = {
	shadowColor: '#000',
	shadowOffset: {
		width: 0,
		height: 2,
	},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,

	elevation: 4,
};

export const colors = {
	appBgColor: '#F5F5F5',

	base1: '#272437',
	base2: '#209653',
	base3: '#6220EE',
	accent1: '#7E52DC',
	accent2: '#40e34e',
	accent3: '#e39c40',

	danger: '#ff000a',
	warning: '#ffc107',
	success: '#409613',

	transparent: 'transparent',
	white: '#fff',
	grey100: 'hsl(0, 0%, 96%)',
	grey200: 'hsl(0, 0%, 90%)',
	grey300: 'hsl(0, 0%, 80%)',
	grey400: 'hsl(0, 0%, 70%)',
	grey500: 'hsl(0, 0%, 60%)',
	grey600: 'hsl(0, 0%, 50%)',
	grey700: 'hsl(0, 0%, 40%)',
	grey800: 'hsl(0, 0%, 30%)',
	grey900: 'hsl(0, 0%, 20%)',
	grey1000: 'hsl(0, 0%, 10%)',
	black: 'hsl(0, 0%, 0%)',
};

const theme = {
	...colors,

	font: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
	fontFeatured: '"Roboto Condensed", sans-serif',

	navbarHeight: '100px',
	globalPadding: '8px',

	fontWeight: {
		light: 300,
		regular: 400,
		semiBold: 500,
		bold: 700,
	},

	radius: {
		1: '4px',
		2: '8px',
		3: '16px',
	},

	breakpoints: {
		xs: '0',
		sm: '576px',
		md: '768px',
		lg: '992px',
		xl: '1200px',
		xxl: '1400px',
	},

	// Color i Amount opcjonalne, ale trzeba podać pusty obiekt
	transparentize: ({ amount = 0.7, color }: Polished) => transparentize(amount ?? 0.7, color ?? theme.base1),
	lighten: ({ amount = 0.7, color }: Polished) => lighten(amount ?? 0.7, color ?? theme.base1),
	darken: ({ amount, color }: Polished) => darken(amount ?? 0.2, color ?? theme.base1),
	shadow: ({ color }: { color?: string }) => `
		box-shadow: 2px 4px 8px ${theme.transparentize({ color, amount: 0.5 })};
		-webkit-box-shadow: 2px 4px 8px ${theme.transparentize({ color, amount: 0.5 })};
	`,
};

export type ThemeType = typeof theme;
export type ColorsKeys = keyof typeof colors;

export default theme;
