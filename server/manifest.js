const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.02bdfb3a.js","imports":["_app/immutable/entry/start.02bdfb3a.js","_app/immutable/chunks/index.139172c0.js","_app/immutable/chunks/singletons.a8873716.js","_app/immutable/chunks/index.e8b7944c.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.59ac0906.js","imports":["_app/immutable/entry/app.59ac0906.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.139172c0.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-eea45c79.js'),
			() => import('./chunks/1-3a4ffad7.js'),
			() => import('./chunks/2-bfba2b5a.js'),
			() => import('./chunks/3-c7498b1a.js'),
			() => import('./chunks/4-bbb1bab2.js'),
			() => import('./chunks/5-0593434e.js'),
			() => import('./chunks/6-dc4c0df3.js'),
			() => import('./chunks/7-6c76a4d5.js'),
			() => import('./chunks/8-864c7fc1.js'),
			() => import('./chunks/9-59c6c67f.js'),
			() => import('./chunks/10-a9e901bc.js'),
			() => import('./chunks/11-51f6484d.js'),
			() => import('./chunks/12-8af201f5.js'),
			() => import('./chunks/13-788627ee.js'),
			() => import('./chunks/14-f20a98a4.js'),
			() => import('./chunks/15-9d58f805.js')
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
