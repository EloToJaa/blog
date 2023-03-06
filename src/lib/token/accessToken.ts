import { env } from '$env/dynamic/private';
import { serialize } from 'cookie';
import { verify } from 'jsonwebtoken';

export const regenerateAccessToken = async (refreshToken: string): Promise<string | null> => {
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
		return data.accessToken;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const checkIfAccessTokenExpired = async (
	refreshToken: string,
	accessToken: string | null
): Promise<string | null> => {
	// get access token from cookie
	if (accessToken === null) {
		return await regenerateAccessToken(refreshToken);
	}

	// if access token is expired, regenerate it
	await verify(accessToken as string, env.ACCESS_TOKEN_SECRET, async (err, _) => {
		if (err) {
			return await regenerateAccessToken(refreshToken);
		}
	});
	return null;
};
