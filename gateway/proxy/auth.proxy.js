import { Router } from 'express';

import services from '../config/services.js';

const router = Router();

router.all ('/*proxyPath', async (req, res) => {
	const target = services.auth + req.url;

	const response = await fetch (target, {
		method: req.method,
		headers: {
			"Content-Type" : "application/json",
		}
	});
	
	const data = await response.json();

	console.log(`${req.method}-> ${target}`);

	res.status( response.status).json(data);
});

export default router;
