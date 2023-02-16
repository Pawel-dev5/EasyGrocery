import React, { createRef, RefObject, Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import theme from 'utils/theme/themeDefault';

// MODELS
import { SearchBarProps } from 'components/layout/models/sections';

export class SearchBar extends Component<SearchBarProps> {
	inputRef: RefObject<TextInput> = createRef();

	componentDidUpdate(prevProps: SearchBarProps) {
		if (prevProps.globalInputValue && this.inputRef.current) this.inputRef.current.focus();
	}

	render() {
		const { fontSize, routeName, marginLeft, searchActive, globalInputValue, setGlobalInputValue } = this.props;

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
				ref={this.inputRef}
				value={globalInputValue}
				onChange={(e) => setGlobalInputValue(e as unknown as string)}
				editable={searchActive}
				style={{ fontSize, marginLeft, ...styles.componentTitle }}
				placeholderTextColor={searchActive ? theme.grey400 : theme.black}
				placeholder={routeName}
			/>
		);
	}
}
