const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.42f135bb.js","imports":["_app/immutable/entry/start.42f135bb.js","_app/immutable/chunks/index.2655b24c.js","_app/immutable/chunks/singletons.291c9286.js","_app/immutable/chunks/index.393cae65.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.8d34a1e5.js","imports":["_app/immutable/entry/app.8d34a1e5.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.2655b24c.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-3c0ac3c8.js'),
			() => import('./chunks/1-506c414a.js'),
			() => import('./chunks/2-8c045db1.js'),
			() => import('./chunks/3-c5bbc21a.js'),
			() => import('./chunks/4-aa189ad3.js'),
			() => import('./chunks/5-54e86db6.js'),
			() => import('./chunks/6-4c8abebc.js'),
			() => import('./chunks/7-46e69a65.js'),
			() => import('./chunks/8-9ba80a7b.js'),
			() => import('./chunks/9-4b93b8d7.js'),
			() => import('./chunks/10-3e70138c.js'),
			() => import('./chunks/11-3fc0d7a3.js'),
			() => import('./chunks/12-5b01c3b6.js'),
			() => import('./chunks/13-0f375401.js'),
			() => import('./chunks/14-6b669b61.js'),
			() => import('./chunks/15-3eea30c9.js')
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
