const qs = require('qs');

export const userQuery = qs.stringify(
	{
		populate: {
			lists: {
				populate: ['items', 'users_permissions_users'],
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
		},
	},
	{
		encodeValuesOnly: true,
	},
);

export const notificatioQuery = qs.stringify(
	{
		populate: ['list', 'sender'],
	},
	{
		encodeValuesOnly: true, // prettify URL
	},
);

export const shopQuery = qs.stringify(
	{
		populate: ['image', 'orders'],
	},
	{
		encodeValuesOnly: true, // prettify URL
	},
);
