import React, { useCallback, useState } from 'react';
import { LayoutAnimation, Platform, UIManager, View, Text, TouchableOpacity, ScrollView } from 'react-native';

// COMPONENTS
import { ExpandableComponent } from 'components/layout/common/expandableListView/sections';

// MODELS
import { DataListInterface, ExpandListInterface } from 'components/layout/common/expandableListView/models/views';
import { Icon } from '../../Icon';

const convertDataToExpand = (data: DataListInterface[]) => {
	const newArr: ExpandListInterface[] = [];
	if (data && data?.length > 0) {
		data.forEach((dataItem) => newArr.push({ ...dataItem, isExpanded: true }));
	}
	return newArr;
};

export const ExpandableList = ({ data, bottomSheetHeight }: { data: DataListInterface[]; bottomSheetHeight: number }) => {
	const [listDataSource, setListDataSource] = useState<ExpandListInterface[]>(convertDataToExpand(data));
	const [multiSelect, setMultiSelect] = useState(true);

	if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true);

	const updateLayout = (index: number) => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		const array = [...listDataSource];
		if (multiSelect) {
			// If multiple select is enabled
			array[index].isExpanded = !array[index].isExpanded;
		} else {
			// If single select is enabled
			array.map((_value, placeindex) => {
				if (placeindex === index) {
					array[placeindex].isExpanded = !array[placeindex].isExpanded;
				} else {
					array[placeindex].isExpanded = false;
				}
				return null;
			});
		}
		setListDataSource(array);
	};

	const toggleAll = (variant: 'expand' | 'collapse') => {
		const newArr: ExpandListInterface[] = [];
		listDataSource?.forEach((listItem) => newArr.push({ ...listItem, isExpanded: variant === 'expand' }));
		if (newArr?.length > 0) {
			setMultiSelect(true);
			setListDataSource(newArr);
		}
		return null;
	};

	const isAllExpanded = useCallback(() => {
		const filteretOnlyWithItems = listDataSource?.filter((item) => item.items?.length > 0);
		const result = filteretOnlyWithItems?.every((obj) => obj?.isExpanded);
		return result;
	}, [listDataSource]);

	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingLeft: 16,
					paddingRight: 16,
					paddingBottom: 8,
				}}
			>
				<TouchableOpacity onPress={() => setMultiSelect(!multiSelect)}>
					<Text
						style={{
							textAlign: 'center',
							justifyContent: 'center',
						}}
					>
						{multiSelect ? 'Single Expand' : 'Multiple Expand'}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => (isAllExpanded() ? toggleAll('collapse') : toggleAll('expand'))}>
					<Icon name={isAllExpanded() ? 'angle-double-up' : 'angle-double-down'} size={20} />
				</TouchableOpacity>
			</View>

			<ScrollView style={{ height: bottomSheetHeight === 1 ? '74%' : '97%', paddingLeft: 16, paddingRight: 16 }}>
				{listDataSource.map((item, key) => (
					<ExpandableComponent key={item?.category} onClickFunction={() => updateLayout(key)} item={item} />
				))}
			</ScrollView>
		</View>
	);
};
