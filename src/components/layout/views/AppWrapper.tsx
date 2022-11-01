import React from 'react';
import { t } from 'i18next';
import { View } from 'react-native';

// COMPONENTS
import { Menu } from 'components/layout/sections';
import { Icon, Loader } from 'components/layout/common';

// MODELS
import { AppLayoutInterface } from 'components/layout/models/views';

// STYLES
import {
	StyledAppLayout,
	StyledAppNavbar,
	StyledButton,
	StyledChildren,
	StyledText,
	StyledBottomAddListButton,
	StyledBottomSheet,
	StyledBottomSheetBody,
	StyledBottomSheetClose,
	StyledBottomSheetHeader,
	StyledFloatingAddListButtonWrapper,
	StyledOverlayBottomSheet,
} from 'components/layout/views/Styles';
import { shadowInline } from 'utils/theme/themeDefault';

export const AppWrapper = ({
	children,
	routeName,
	variant = 'grey',
	navigation,
	bottomSheet,
	lang,
	setLang,
	visible,
	onClose,
	floatedItems,
	customPadding,
	isLoading,
	bottomSheetHeader,
}: AppLayoutInterface) => (
	<StyledAppLayout>
		<StyledAppNavbar variant={variant}>
			<View style={{ width: 45, aspectRatio: 1 }}>
				{navigation?.canGoBack() && (
					<StyledButton onPress={() => navigation?.goBack()}>
						<Icon variant={variant} name="angle-left" size={30} />
					</StyledButton>
				)}
			</View>

			<StyledText variant={variant}>{routeName}</StyledText>

			<Menu variant={variant} navigation={navigation} lang={lang} setLang={setLang} />
		</StyledAppNavbar>

		{isLoading ? (
			<Loader size={100} />
		) : (
			<>
				{children && <StyledChildren customPadding={customPadding}>{children}</StyledChildren>}

				{bottomSheet && visible && onClose && (
					<>
						<StyledOverlayBottomSheet onPress={() => onClose()} />
						<StyledBottomSheet style={shadowInline}>
							<StyledBottomSheetClose onPress={() => onClose()} />

							<StyledBottomSheetBody>
								{bottomSheetHeader && <StyledBottomSheetHeader>{t<string>(bottomSheetHeader)}</StyledBottomSheetHeader>}
								{bottomSheet}
							</StyledBottomSheetBody>
						</StyledBottomSheet>
					</>
				)}

				{floatedItems && (
					<StyledFloatingAddListButtonWrapper>
						{floatedItems?.map(({ id, icon, variant, size, onPress }) => (
							<StyledBottomAddListButton key={id} onPress={onPress} style={shadowInline}>
								<Icon name={icon} size={size} variant={variant} />
							</StyledBottomAddListButton>
						))}
					</StyledFloatingAddListButtonWrapper>
				)}
			</>
		)}
	</StyledAppLayout>
);
