import toast from 'svelte-french-toast';

export const notify = (notification: string | undefined, error: boolean | undefined) => {
	if (!notification) return;
	if (error === undefined) return;
	if (error) {
		toast.error(notification, { duration: 10000 });
	} else {
		toast.success(notification, { duration: 10000 });
	}
};
