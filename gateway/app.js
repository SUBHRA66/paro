import express from 'express';
import cors from 'cors';

import registerProxy from './proxy/registerProxy.js';

const app = express();

app.use ('/speed', (req, res) => {
	res.status (200).json({
		message: "virat kohli",
		status : "OK",
	})
})

registerProxy (app);

export default app;
