import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import { Button, SafeAreaView, Image } from 'react-native';
import axios from 'axios';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormData from 'form-data';

// REDUX
import { selectGlobal } from 'redux/slices/global';
import { useAppSelector } from 'redux/hooks';

// COMPONENTS
import { ControllerWrapper } from 'components/auth/sections';
import { AppWrapper } from 'components/layout';
import { Loader } from 'components/layout/common';

// STYLES
import { StyledLoginContainer, StyledInputWrapper } from 'components/user/views/Styles';

import { userQuery } from 'utils/queries';
import { uploadImageFromDevice, getBlobFromUri, manageFileUpload } from 'utils/fileUpload';
import { ImagePicker } from '../elements';

const schema = yup
	.object({
		username: yup.string().required(),
		email: yup.string().required(),
		files: yup.object(),
	})
	.required();

export const Profile = (props: any) => {
	const globalState = useAppSelector(selectGlobal);
	const user = globalState?.user;

	const [file, setFile] = useState<any>(null);
	const [image, setImage] = useState<any>(null);

	const [isUploading, setIsUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [remoteURL, setRemoteURL] = useState('');
	const [error, setError] = useState(null);

	if (!user) return <Loader size={80} />;
	const { username, email, id, cover } = user;

	const { control, handleSubmit, formState, getValues, setValue } = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			username,
			email,
			files: cover,
		},
		reValidateMode: 'onChange',
	});

	useEffect(() => {
		// if (file !== null) setValue('files', file[0]);
	}, [file]);

	const { errors } = formState;

	const handleLocalImageUpload = async () => {
		const newFile = await uploadImageFromDevice();

		if (newFile) {
			setImage(newFile);
		}
	};
	console.log(image);

	const onStart = () => {
		setIsUploading(true);
	};

	const onProgress = (newProgress: any) => {
		setProgress(newProgress);
	};
	const onComplete = (fileUrl: any) => {
		setRemoteURL(fileUrl);
		setIsUploading(false);
		setImage(null);
	};

	const onFail = (newError: any) => {
		setError(newError);
		setIsUploading(false);
	};
	console.log(image);
	const handleCloudImageUpload = async () => {
		if (image !== null) {
			// const response = await fetch(image);
			// const blob = await response.blob();
			const now = new Date();
			const imageData = new File([image.assets[0]], 'image');
			// console.log('response', response);
			// console.log('blob', blob);

			// const blob = await getBlobFromUri(image);
			// await console.log(blob);

			const newDataStringify = JSON.stringify({
				ref: 'plugin::users-permissions.user',
				refId: user?.id,
				field: 'cover',
				path: 'API Uploads',
				files: image.assets[0],
			});
			// console.log(newDataStringify);
			const post = () => {
				axios
					.post(`upload`, { data: newDataStringify })
					.then((resp) => console.log(resp.data))
					.catch((error) => console.log(error));
			};
			await post();
			// await manageFileUpload(blob, { onStart, onProgress, onComplete, onFail });
		}
	};

	const updateProfileCover = async () => {
		const formData = new FormData();
		// formData.append('ref', 'plugin::users-permissions.user');
		// formData.append('refId', user?.id!);
		// formData.append('field', 'cover');
		// formData.append('path', 'API Uploads');
		// const response = await fetch(image!);

		// await formData.append('files', response.url);

		formData.append('files', { uri: image, name: 'ooo', type: 'image/jpeg' }, 'image/jpeg');

		// const newDataStringify = JSON.stringify({
		// 	ref: 'plugin::users-permissions.user',
		// 	refId: user?.id,
		// 	field: 'cover',
		// 	path: 'API Uploads',
		// 	files: image,
		// });
		// const newData = {
		// 	ref: 'plugin::users-permissions.user',
		// 	refId: user?.id,
		// 	field: 'cover',
		// 	path: 'API Uploads',
		// 	files: file[0],
		// };

		// axios
		// 	.post(`upload`, formData)
		// 	.then((resp) => console.log(resp.data))
		// 	.catch((error) => console.log(error));

		// axios
		// 	.post('upload', formData, {
		// 		transformRequest: (data) => {
		// 			console.log(data);
		// 			return formData; // this is doing the trick
		// 		},
		// 	})
		// 	.catch((error) => console.log(error));
		const createFormData = (uri: any) => {
			const fileName = uri.split('/').pop();
			const fileType = fileName.split('.').pop();
			const newFormData = new FormData();
			newFormData.append('files', {
				uri,
				name: fileName,
				type: `image/${fileType}`,
			});

			return newFormData;
		};
		console.log(image.assets[0].uri);
		const form = new FormData();
		form.append('file', { uri: image.assets[0].uri, name: 'media', type: `image/${image.assets[0].type}` } as any);

		const url = 'http://localhost:1337/api/upload';
		const options = {
			method: 'POST',
			body: createFormData(image.assets[0].uri),
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc0MTQ1NDE0LCJleHAiOjE2NzY3Mzc0MTR9.odyQ3mp5WVu07WUEec--qWZOl_2iNOTJShZHbE9CLK8',
				Accept: 'application/json',
				'Content-Type': 'application/json;',
			},
		};
		fetch(url, options)
			.then((response) => console.log(response))
			.catch((err) => {
				console.log(err);
			});
	};

	const updateProfile = () => {
		axios
			.put(`users/${id}/?${userQuery}`, getValues())
			.then((resp) => console.log(resp.data))
			.catch((error) => console.log(error?.response?.data?.error));
	};

	return (
		<AppWrapper routeName={t('profile.profile')} {...props}>
			<SafeAreaView>
				<StyledLoginContainer>
					<StyledInputWrapper>
						<ControllerWrapper
							name="username"
							placeholder="username"
							keyboardType="default"
							textContentType="nickname"
							control={control}
							errors={errors}
						/>
					</StyledInputWrapper>

					<StyledInputWrapper>
						<ControllerWrapper
							name="email"
							placeholder="Email"
							keyboardType="email-address"
							textContentType="emailAddress"
							autoComplete="email"
							control={control}
							errors={errors}
						/>
					</StyledInputWrapper>

					<Button title={t<string>('general.save')} onPress={handleSubmit(updateProfile)} />
					<Button title="cover" onPress={() => updateProfileCover()} />

					<Button title="newUpload" onPress={() => handleLocalImageUpload()} />
					<Button title="newSend" onPress={() => handleCloudImageUpload()} />
					{/* {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />} */}

					{/* <ImagePicker setFile={setFile} /> */}
				</StyledLoginContainer>
			</SafeAreaView>
		</AppWrapper>
	);
};
