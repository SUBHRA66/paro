import jwt from 'jsonwebtoken';
import privateKey from '../../common/jwt/privateKey.js';
import publicKey from '../../common/jwt/publicKey.js';

class Jwt {
  static get getPublicKey() {
    return publicKey;
  }

  static signToken (payload, options = {}) {
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
