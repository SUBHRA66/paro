import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import appConfig from '../config/app.config.js';

const __filename = fileURLToPath (import.meta.url);
const __dirname  = path.dirname (__filename);

function registerFrontend (express_app) {
	for (const [name, config] of Object.entries (appConfig)) {
		const staticPath = path.resolve(__dirname, config.dir);

		express_app.use (config.route, express.static (staticPath));

		console.log (`${config.route} -> ${staticPath}`);

		express_app.get (`${config.route}/*path`, (req, res) => {
			res.sendFile (path.join (staticPath, "index.html" ));
		})
	}
}

export default registerFrontend;
