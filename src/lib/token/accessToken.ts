import { verify } from 'jsonwebtoken';
let accessToken: string | null = null;

export const regenerateAccessToken = async () => {
	try {
		const res = await fetch('http://localhost:3000/auth/token');
		const data = await res.json();
		accessToken = data.accessToken;
	} catch (err) {
		accessToken = null;
	}
};

export const checkIfAccessTokenExpired = async () => {
	if (!accessToken) {
		await regenerateAccessToken();
	}

	// if access token is expired, regenerate it
	await verify(accessToken as string, process.env.JWT_SECRET as string, async (err, _) => {
		if (err) {
			await regenerateAccessToken();
		}
	});
};

export const getAccessToken = () => {
	return accessToken;
};
