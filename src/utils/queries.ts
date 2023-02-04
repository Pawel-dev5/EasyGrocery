const qs = require('qs');

export const userQuery = qs.stringify(
	{
		populate: {
			lists: {
				populate: ['items', 'users_permissions_users'],
			},
			cover: {
				populate: ['ext', 'alternativeText', 'id', 'url'],
			},
		},
	},
	{
		encodeValuesOnly: true,
	},
);

export const listQuery = qs.stringify(
	{
		populate: ['items', 'users_permissions_users', 'shop.orders', 'shop.image', 'invitations'],
	},
	{
		encodeValuesOnly: true,
	},
);

export const listNotificationQuery = qs.stringify(
	{
		populate: {
			list: {
				populate: '*',
			},
			users_permissions_user: {
				data: {
					attributes: {
						populate: '*',
					},
				},
			},
			sender: {
				data: {
					attributes: {
						populate: '*',
					},
				},
			},
		},
	},
	{
		encodeValuesOnly: true,
	},
);

export const notificatioQuery = qs.stringify(
	{
		populate: ['list', 'sender', 'users_permissions_user'],
	},
	{
		encodeValuesOnly: true,
	},
);

export const shopQuery = qs.stringify(
	{
		populate: ['image', 'orders'],
	},
	{
		encodeValuesOnly: true,
	},
);

export const notificationsQuery = (value: string) =>
	qs.stringify(
		{
			populate: {
				list: {
					populate: ['invitations', 'users_permissions_users'],
				},
				sender: {
					populate: '*',
				},
			},
			filters: {
				users_permissions_user: {
					email: {
						$eq: value,
					},
				},
			},
			sort: ['createdAt:desc'],
		},
		{
			encodeValuesOnly: true,
		},
	);

export const searchUserQuery = (currentUser: string, value: string) =>
	qs.stringify(
		{
			filters: {
				username: {
					$contains: value,
					$ne: currentUser,
				},
			},
		},
		{
			encodeValuesOnly: true,
		},
	);

// SHOPS QUERIES
export const shopsQuery = (shopName: string, category: string[], paginationStart: number) =>
	qs.stringify(
		{
			populate: {
				[`${shopName}Prices`]: {
					populate: '*',
				},
			},
			filters: {
				category: {
					$in: category,
				},
			},
			sort: ['title:asc', 'id:asc'],
			pagination: {
				page: paginationStart,
				pageSize: 50,
			},
		},
		{
			encodeValuesOnly: true,
		},
	);
