import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

// COMPONENTS
import { Icon, Input } from 'components/layout/common';

// MODELS
import { SearchInterface } from 'components/layout/models/common';

// STYLES
import { StyledSearchWrapper, StyledPopperWrapper, StyledUserWrapper } from 'components/layout/elements/Styles';
import { User } from 'config/models';
import { findObjectInArray } from 'utils/helpers/arrayHelpers';

export const Search = ({
	name,
	placeholder,
	textContentType,
	setSearchIcons,
	results,
	actualUsers,
	optionOnClick,
}: SearchInterface) => {
	const [showMore, setShowMore] = useState(false);

	useEffect(() => (results?.length > 0 ? setShowMore(true) : setShowMore(false)), [results]);

	return (
		<StyledSearchWrapper style={{ zIndex: 5000 }}>
			<Input
				name={name}
				placeholder={placeholder}
				textContentType={textContentType}
				onChangeText={(e) => setSearchIcons(e)}
			/>

			{showMore && (
				<StyledPopperWrapper>
					{results?.map((user: User, index: number) => (
						<TouchableOpacity style={{ width: '100%' }} key={user?.id} onPress={() => optionOnClick(user)}>
							<StyledUserWrapper
								notLast={index + 1 !== results.length}
								colorType={findObjectInArray(actualUsers!, 'email', user?.email)?.access}
							>
								{user?.username}
								{findObjectInArray(actualUsers!, 'email', user?.email) && <Icon name="trash" />}
							</StyledUserWrapper>
						</TouchableOpacity>
					))}
				</StyledPopperWrapper>
			)}
		</StyledSearchWrapper>
	);
};
