import React, { Component, useState } from 'react';

// REDUX
import { globalSetGlobalSearchInput, selectGlobal } from 'redux/slices/global';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

// COMPONENTS
import { Input } from 'components/layout/common';

// MODELS
import { SearchBarProps } from 'components/layout/models/sections';

// UTILS
import theme from 'utils/theme/themeDefault';

// STYLES
import { searchBarInlineStyles } from 'components/layout/sections/Styles';

const InputWrapper = ({ fontSize, routeName, marginLeft, searchActive }: SearchBarProps) => {
	const dispatch = useAppDispatch();
	const globalState = useAppSelector(selectGlobal);
	const { globalSearchInput } = globalState;
	const [searchedData, setSearchedData] = useState(globalSearchInput);

	return (
		<Input
			name="globalSearch"
			value={searchedData}
			textContentType="nickname"
			onSubmitEditing={() => dispatch(globalSetGlobalSearchInput(searchedData))}
			onChangeText={(e) => setSearchedData(e)}
			blurOnSubmit={false}
			placeholderTextColor={searchActive ? theme.grey400 : theme.black}
			placeholder={routeName}
			customStyle={{ fontSize, marginLeft, ...searchBarInlineStyles.componentTitle }}
			editable={searchActive}
			autoFocus={searchedData === ''}
			globalSearch
		/>
	);
};

// THIS MUST BE CLASS COMPONENT BECAUSE OF REACT NATIVE ANIMATION RESTRICTIONS
export class SearchBar extends Component<SearchBarProps> {
	constructor(props: SearchBarProps) {
		super(props);
		this.state = {};
	}

	render() {
		const { fontSize, routeName, marginLeft, searchActive } = this.props;
		return <InputWrapper fontSize={fontSize} routeName={routeName} marginLeft={marginLeft} searchActive={searchActive} />;
	}
}
