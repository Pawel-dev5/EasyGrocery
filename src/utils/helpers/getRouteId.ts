import { findObjectInArray } from './arrayHelpers';

interface RouteInterface {
	params: {
		id: string;
	};
}
export const getRouteId = (navigation: any, route: string) => {
	let id;
	const routeObject: RouteInterface | null = findObjectInArray(navigation?.getState().routes, 'name' as never, route);
	if (routeObject) id = routeObject?.params.id;

	return id;
};
