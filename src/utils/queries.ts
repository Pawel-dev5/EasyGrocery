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
		populate: ['items', 'items.prices', 'users_permissions_users', 'shop.orders', 'shop.image', 'invitations'],
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
				[`${shopName}Prices`]: {
					promotion: {
						$eq: 'null',
					},
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

export const shopsPromotionQuery = (shopName: string, category: string[], paginationStart: number) => {
	const daysTimeAgo = 7; // Days you want to subtract
	const currentDate = new Date();
	const last = new Date(currentDate.getTime() - daysTimeAgo * 24 * 60 * 60 * 1000);
	const lastDay = last.getDate();
	const lastMonth = last.getMonth() + 1;
	const lastYear = last.getFullYear();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const currentDay = currentDate.getDate();

	const handleZero = (value: number) => {
		if (value >= 10) return value;
		return `0${value}`;
	};

	const weekAgo = `${lastYear}-${handleZero(lastMonth)}-${handleZero(lastDay)}`;
	const currentFinalDate = `${currentYear}-${handleZero(currentMonth + 1)}-${handleZero(currentDay)}`;

	return qs.stringify(
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
				[`${shopName}Prices`]: {
					promotion: {
						$ne: 'null',
					},
					date: {
						$gte: weekAgo,
						$lte: currentFinalDate,
					},
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
};
