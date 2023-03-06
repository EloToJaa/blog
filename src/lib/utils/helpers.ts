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
