const getDate = (date: string | undefined, short = false) => {
	if (!date) return null;
	const dateObj = new Date(date);
	if (short) {
		return dateObj.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
	return dateObj.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: false
	});
};

export default getDate;
