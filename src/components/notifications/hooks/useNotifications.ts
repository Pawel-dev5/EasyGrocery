import { useState } from 'react';
import axios from 'axios';

// MODELS
import { User } from 'config/models';

const qs = require('qs');

export const useNotifications = ({ user }: { user: User | null }) => {
	const [notifications, setNotifications] = useState([]);

	const getNotifications = () => {
		const query = qs.stringify(
			{
				populate: ['users_permissions_user', 'list', 'sender'],
				filters: {
					users_permissions_user: {
						email: {
							$eq: user?.email,
						},
					},
				},
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);

		axios
			.get(`notifications/?${query}`)
			.then((resp) => {
				setNotifications(resp?.data?.data);
			})
			.catch((error) => console.log(error?.response?.data?.error?.message));
	};

	return { notifications, getNotifications };
};
