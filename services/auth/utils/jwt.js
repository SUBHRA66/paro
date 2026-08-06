import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keysDir = path.join(__dirname, '../keys');
const privateKeyPath = path.join(keysDir, 'private.pem');
const publicKeyPath = path.join(keysDir, 'public.pem');

let privateKey;
let publicKey;

if (fs.existsSync(privateKeyPath) && fs.existsSync(publicKeyPath)) {
  privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  publicKey = fs.readFileSync(publicKeyPath, 'utf8');
} else {
  // Generate RSA 2048-bit key pair if keys do not exist on disk
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  privateKey = keyPair.privateKey;
  publicKey = keyPair.publicKey;

  try {
    if (!fs.existsSync(keysDir)) {
      fs.mkdirSync(keysDir, { recursive: true });
    }
    fs.writeFileSync(privateKeyPath, privateKey);
    fs.writeFileSync(publicKeyPath, publicKey);
  } catch (err) {
    console.warn('[Jwt] Could not persist RSA keys to disk:', err.message);
  }
}

class Jwt {
  static getPublicKey() {
    return publicKey;
  }

  static signToken(payload, options = {}) {
    let plainPayload =
      payload && typeof payload === 'object'
        ? payload.toObject
          ? payload.toObject()
          : { ...payload }
        : payload;

    if (typeof plainPayload === 'object' && plainPayload !== null) {
      if (plainPayload._id) {
        plainPayload.id = plainPayload._id.toString();
        delete plainPayload._id;
      }
      delete plainPayload.__v;
      delete plainPayload.hash;
    }

    return jwt.sign(plainPayload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '1h',
      ...options,
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, publicKey, {
      algorithms: ['RS256'], // reject anything not RS256
    });
  }
}

export default Jwt;