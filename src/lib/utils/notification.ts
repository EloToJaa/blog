import toast from 'svelte-french-toast';

export const notify = (notification: string | undefined, error: boolean | undefined) => {
	if (!notification) return;
	if (error === undefined) return;
	const options = {
		duration: 10000,
		style: 'border-radius: 200px; background: #333; color: #fff; margin-top: 60px;'
	};
	if (error) {
		toast.error(notification, options);
	} else {
		toast.success(notification, options);
	}
};
