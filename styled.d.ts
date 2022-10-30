import 'styled-components';
import { ThemeType } from 'utils/theme/themeDefault';

declare module 'styled-components' {
	interface DefaultTheme extends ThemeType {}
}
