import type UserType from '$lib/types/User';

export const serializeNonPOJOs = (obj: any) => {
	return JSON.parse(JSON.stringify(obj));
};

export const convertMessagesFromPocketBase = (err: object | any) => {
	for (const key in err.response.data) {
		err.response.data[key] = [err.response.data[key].message];
	}
	return err.response.data;
};

export const parseDateFromInput = (date: string) => {
	date = date.replace(' ', 'T');
	date = date + ':00Z';
	return date;
};

export const checkPermissions = (requiredPermissions: string[], user: UserType | null) => {
	if (!user) return false;
	if (user.permissions?.admin) return true;
	const userPermissions = Object.keys(user.permissions || {});
	return requiredPermissions.every((permission) => userPermissions.includes(permission));
};
