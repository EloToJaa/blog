const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.bcb244b3.js","imports":["_app/immutable/entry/start.bcb244b3.js","_app/immutable/chunks/index.139172c0.js","_app/immutable/chunks/singletons.12df9a83.js","_app/immutable/chunks/index.e8b7944c.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.708ff408.js","imports":["_app/immutable/entry/app.708ff408.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.139172c0.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-a1be3887.js'),
			() => import('./chunks/1-394cc6f8.js'),
			() => import('./chunks/2-52f83bdc.js'),
			() => import('./chunks/3-ac0b4077.js'),
			() => import('./chunks/4-d9527b80.js'),
			() => import('./chunks/5-c9c5b6a7.js'),
			() => import('./chunks/6-774db4fd.js'),
			() => import('./chunks/7-53b2a8b9.js'),
			() => import('./chunks/8-864c7fc1.js'),
			() => import('./chunks/9-3dae9a1d.js'),
			() => import('./chunks/10-14b766dc.js'),
			() => import('./chunks/11-e2e3747a.js'),
			() => import('./chunks/12-5e807067.js'),
			() => import('./chunks/13-0f805ba0.js'),
			() => import('./chunks/14-37092953.js'),
			() => import('./chunks/15-dc92a4f8.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/article/add",
				pattern: /^\/article\/add\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/article/delete/[slug]",
				pattern: /^\/article\/delete\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./chunks/_server.ts-a207293d.js')
			},
			{
				id: "/article/edit/[slug]",
				pattern: /^\/article\/edit\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/auth/confirm/password-reset/[token]",
				pattern: /^\/auth\/confirm\/password-reset\/([^/]+?)\/?$/,
				params: [{"name":"token","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/auth/confirm/verification/[token]",
				pattern: /^\/auth\/confirm\/verification\/([^/]+?)\/?$/,
				params: [{"name":"token","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/auth/logout",
				pattern: /^\/auth\/logout\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./chunks/_server.ts-3aea731d.js')
			},
			{
				id: "/blog/[slug]",
				pattern: /^\/blog\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			},
			{
				id: "/password-reset",
				pattern: /^\/password-reset\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			},
			{
				id: "/profile/[username]",
				pattern: /^\/profile\/([^/]+?)\/?$/,
				params: [{"name":"username","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 11 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 12 },
				endpoint: null
			},
			{
				id: "/search",
				pattern: /^\/search\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 13 },
				endpoint: null
			},
			{
				id: "/user",
				pattern: /^\/user\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 14 },
				endpoint: null
			},
			{
				id: "/user/delete",
				pattern: /^\/user\/delete\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./chunks/_server.ts-22424617.js')
			},
			{
				id: "/verification",
				pattern: /^\/verification\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 15 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
