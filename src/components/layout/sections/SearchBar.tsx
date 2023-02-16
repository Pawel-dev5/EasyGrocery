import React, { Component, RefObject, useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

// REDUX
import { globalSetGlobalSearchInput, selectGlobal } from 'redux/slices/global';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

// MODELS
import { SearchBarProps } from 'components/layout/models/sections';

// UTILS
import theme from 'utils/theme/themeDefault';
import { useDebounce } from 'utils/helpers/useDebounce';

// STYLES
import { searchBarInlineStyles } from 'components/layout/sections/Styles';

const InputWrapper = ({ fontSize, routeName, marginLeft, searchActive }: SearchBarProps) => {
	const dispatch = useAppDispatch();
	const globalState = useAppSelector(selectGlobal);
	const { globalSearchInput } = globalState;
	const inputRef: RefObject<TextInput> = useRef(null);
	const [searchedUsers, setSearchedUsers] = useState(globalSearchInput);
	const searchUsersValueDebounced = useDebounce(searchedUsers || '', 500);

	const handleInput = (text: string) => setSearchedUsers(text);

	useEffect(() => {
		if (searchUsersValueDebounced !== '' && searchedUsers !== globalSearchInput)
			dispatch(globalSetGlobalSearchInput(searchUsersValueDebounced));
	}, [searchUsersValueDebounced]);

	return (
		<TextInput
			ref={inputRef}
			onLayout={() => inputRef?.current?.focus()}
			key="globalSearch"
			value={searchedUsers}
			onChange={(e) => handleInput(e.nativeEvent.text)}
			editable={searchActive}
			style={{ fontSize, marginLeft, ...searchBarInlineStyles.componentTitle }}
			placeholderTextColor={searchActive ? theme.grey400 : theme.black}
			placeholder={routeName}
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
