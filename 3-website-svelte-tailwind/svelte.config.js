import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null, // ❗️null = повний prerender, без SPA fallback
			strict: true
		}),
		paths: {
			base: ''
		},
		prerender: {
			entries: ['*'] // ✅ дозволяє всі статичні маршрути
		}
	}
};

export default config;