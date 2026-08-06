import AuthService from '../services/auth.js';

class AuthController {
  static async signup(req, res, next) {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        const error = new Error('Please provide name, email, and password');
        error.statusCode = 400;
        throw error;
      }

      const result = await AuthService.signup({ name, email, password, role });

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        ...result,
      });

    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        const error = new Error('Please provide email and password');
        error.statusCode = 400;
        throw error;
      }

      const result = await AuthService.login({ email, password });

      return res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req, res, next) {
    try {
      if (!req.user) {
        const error = new Error('Unauthorized');
        error.statusCode = 404;
        throw error;
      }

      const user = await AuthService.getMe(req.user);
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
