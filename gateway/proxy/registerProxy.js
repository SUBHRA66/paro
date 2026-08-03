import { createProxyMiddleware } from 'http-proxy-middleware';
import services from '../config/services.js';


function registerProxy (express_app) {
	for (const [prefix, target] of Object.entries(services)) {
		console.log("prefix\t", prefix)
		console.log("target\t", target)
		express_app.use(
			`/${prefix}`,
			createProxyMiddleware({
				target,
				changeOrigin: true,
				pathRewrite: {
					[`^/${prefix}`]: ``,
				},
			})
		)
	}
}

export default registerProxy;
