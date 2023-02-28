import { parse, serialize } from 'cookie';
import { verify } from 'jsonwebtoken';
let accessToken: string | null = null;

export const regenerateAccessToken = async (refreshToken: string) => {
	try {
		const res = await fetch('http://localhost:3000/auth/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Cookie: serialize('authToken', refreshToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'strict',
					maxAge: 60 * 60 * 24 * 7
				})
			}
		});
		const data = await res.json();
		accessToken = data.accessToken;
	} catch (err) {
		accessToken = null;
		console.log(err);
	}
};

export const checkIfAccessTokenExpired = async (cookies: string) => {
	// get access token from cookie
	const parsedCookies = parse(cookies);
	const refreshToken = parsedCookies.authToken;
	if (!accessToken) {
		await regenerateAccessToken(refreshToken);
		return;
	}

	// if access token is expired, regenerate it
	await verify(accessToken as string, process.env.JWT_SECRET as string, async (err, _) => {
		if (err) {
			await regenerateAccessToken(refreshToken);
		}
	});
};

export const getAccessToken = () => {
	return accessToken;
};

export const setAccessToken = (newAccessToken: string | null) => {
	accessToken = newAccessToken;
};
