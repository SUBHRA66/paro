import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthMiddleware {
  static async ensureAuthenticated(req, res, next) {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    try {
      const jwtSecret = process.env.JWT_SECRET || 'supersecret_jwt_key_paro_2026';
      const decoded = jwt.verify(token, jwtSecret);

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        error: error.message,
      });
    }
  };
}


export default AuthMiddleware;
