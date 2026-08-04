import { createProxyMiddleware } from 'http-proxy-middleware';
import servicesConfig from '../config/service.config.js';


function registerProxy (express_app) {
	for (const [prefix, target] of Object.entries(servicesConfig)) {
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
