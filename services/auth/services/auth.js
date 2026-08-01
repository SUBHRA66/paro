import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserService from '../../user/services/user.js';

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'supersecret_jwt_key_paro_2026';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ id }, secret, { expiresIn });
};

class AuthService {
  static async signup({ name, email, password, role }) {
    const existingUser = await UserService.findUserByEmail(email);
    if (existingUser) {
      const error = new Error('User with this email already exists');
      error.statusCode = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserService.createUser({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    const token = generateToken(user._id);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  static async login({ email, password }) {
    const user = await UserService.findUserByEmail(email, true);
    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    // Password Verification Logic
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user._id);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  static async getMe(user) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}

export default AuthService;
