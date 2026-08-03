import 'dotenv/config';

import app from './app.js';

const PORT = process.env.GATEWAY_PORT || 7777;

app.listen(PORT, () => {
	console.log(`[Gateway Application] started running on port ${PORT}`);
})
