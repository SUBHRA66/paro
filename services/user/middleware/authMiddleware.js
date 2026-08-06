import jwt from 'jsonwebtoken';
import UserService from '../services/user.js';

class AuthMiddleware {
  static async authenticate(req, res, next) {
    return AuthMiddleware.isAuthenticated(req, res, next);
  }

  static async isAuthenticated(req, res, next) {
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
        message: 'Unauthorized: No token provided',
      });
    }

    try {
      const jwtSecret = process.env.JWT_SECRET || 'supersecret_jwt_key_paro_2026';
      const decoded = jwt.verify(token, jwtSecret);

      const user = await UserService.findUserById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: User not found',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid or expired token',
        error: error.message,
      });
    }
  }

  /**
   * Middleware to authorize users by specific roles
   */
  static authorize(...roles) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Authentication required',
        });
      }

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Forbidden: User role '${req.user.role}' is not authorized to access this route`,
        });
      }

      next();
    };
  }
}

export default AuthMiddleware;
