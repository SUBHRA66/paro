import express from 'express';
import cors from 'cors';

import registerProxy    from './proxy/registerProxy.js';
import registerFrontend from './proxy/registerFrontend.js';

const app = express();

app.use ('/speed', (req, res) => {
	res.status (200).json({
		message: "virat kohli",
		status : "OK",
	})
})

registerFrontend (app);

registerProxy (app);

export default app;
