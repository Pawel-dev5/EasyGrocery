import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

// REDUX
import { globalSetGlobalSearchInput } from 'redux/slices/global';

// MODELS
import { SearchBarProps } from 'components/layout/models/sections';

// UTILS
import theme from 'utils/theme/themeDefault';

class SearchBar extends Component<SearchBarProps> {
	constructor(props: SearchBarProps) {
		super(props);
		this.state = {};
	}

	render() {
		const { fontSize, routeName, marginLeft, searchActive, value, handleInput } = this.props;

		const styles = StyleSheet.create({
			componentTitle: {
				textAlign: 'left',
				fontWeight: '500',
				overflow: 'hidden',
				width: '80%',
			},
		});

		return (
			<TextInput
				key="globalSearch"
				autoFocus
				value={value}
				onChange={(e) => handleInput(e.nativeEvent.text as unknown as string)}
				editable={searchActive}
				style={{ fontSize: searchActive ? fontSize : 22, marginLeft, ...styles.componentTitle }}
				placeholderTextColor={searchActive ? theme.grey400 : theme.black}
				placeholder={routeName}
			/>
		);
	}
}

const mapStateToProps = (state: { global: { globalSearchInput: string } }) => ({
	value: state.global.globalSearchInput,
});

const mapDispatchToProps = (dispatch: any) => ({
	handleInput: (data: string) => dispatch(globalSetGlobalSearchInput(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
