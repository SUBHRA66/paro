import bcrypt from 'bcryptjs';

import Auth from '../models/Auth.js';
import Jwt from '../utils/jwt.js';


const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:7002';

class AuthService {

  static async signup({ name, email, password, role }) {
    const existingAuth = await Auth.findOne({ email });

    if (existingAuth) {
      const error = new Error('User with this email already exists');
      error.statusCode = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt (10);
    const hash = await bcrypt.hash (password, salt);

    const authUser = await Auth.create({
      email,
      hash,
      roles: role || 'User',
      is_verified: false,
      is_active: true,
    });

    let user = null;

    try {
      // API call to User service to create user
      const response = await fetch(`${USER_SERVICE_URL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email,
          role: role || 'user',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        user = data.data;
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('[AuthService] User API response error:', errorData);
      }
    } catch (apiError) {
      console.error('[AuthService] Failed to make API call to User Service:', apiError.message);
    }

    const token = Jwt.signToken(authUser);

    return {
      token,
      user: {
        id: authUser._id,
        email: authUser.email,
        roles: authUser.roles,
        is_verified: authUser.is_verified,
        is_active: authUser.is_active,
        name: user?.name,
      },
    };
  }

  static async login({ email, password }) {
    const authUser = await Auth.findOne({ email });

    if (!authUser || !authUser.is_active) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, authUser.hash);

    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const token = Jwt.signToken(authUser);

    return {
      token,
      user: {
        id: authUser._id,
        email: authUser.email,
        roles: authUser.roles,
        is_verified: authUser.is_verified,
        is_active: authUser.is_active,
      },
    };
  }

  static async getMe(user) {
    if (user._id) {
      const authUser = await Auth.findById(user._id);
      if (authUser) {
        return {
          id: authUser._id,
          email: authUser.email,
          roles: authUser.roles,
          is_verified: authUser.is_verified,
          is_active: authUser.is_active,
          createdAt: authUser.createdAt,
        };
      }
    }
    return user;
  }
}

export default AuthService;
