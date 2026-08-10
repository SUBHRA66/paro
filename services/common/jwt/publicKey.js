import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicKeyPath = path.join(
    __dirname,
    '../keys/public.pem'
);

const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

export default publicKey;
