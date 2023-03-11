const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.6b1191fe.js","imports":["_app/immutable/entry/start.6b1191fe.js","_app/immutable/chunks/index.139172c0.js","_app/immutable/chunks/singletons.0f24bd3f.js","_app/immutable/chunks/index.e8b7944c.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.cb45be51.js","imports":["_app/immutable/entry/app.cb45be51.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.139172c0.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-cc724b4a.js'),
			() => import('./chunks/1-9e33506c.js'),
			() => import('./chunks/2-766bdb87.js'),
			() => import('./chunks/3-67acfee3.js'),
			() => import('./chunks/4-5ac98286.js'),
			() => import('./chunks/5-07f6d72e.js'),
			() => import('./chunks/6-774db4fd.js'),
			() => import('./chunks/7-42c1ff85.js'),
			() => import('./chunks/8-864c7fc1.js'),
			() => import('./chunks/9-3dae9a1d.js'),
			() => import('./chunks/10-14b766dc.js'),
			() => import('./chunks/11-d5299c42.js'),
			() => import('./chunks/12-c37b920b.js'),
			() => import('./chunks/13-e4474c94.js'),
			() => import('./chunks/14-220f15b0.js'),
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
