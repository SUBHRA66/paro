import User from '../models/User.js';

class UserService {
  /**
   * Create a new user in database
   */
  static async createUser({ name, email, password, role }) {
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });
    return user;
  }

  /**
   * Find user by email
   */
  static async findUserByEmail(email, includePassword = false) {
    const query = User.findOne({ email });
    if (includePassword) {
      query.select('+password');
    }
    return await query;
  }

  /**
   * Find user by ID
   */
  static async findUserById(id, includePassword = false) {
    const query = User.findById(id);
    if (includePassword) {
      query.select('+password');
    }
    return await query;
  }

  /**
   * Fetch all users
   */
  static async getAllUsers() {
    return await User.find().select('-password');
  }

  /**
   * Update user details by ID
   */
  static async updateUser(id, updateData) {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      const error = new Error(`User not found with id ${id}`);
      error.statusCode = 404;
      throw error;
    }

    return user;
  }

  /**
   * Delete user by ID
   */
  static async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      const error = new Error(`User not found with id ${id}`);
      error.statusCode = 404;
      throw error;
    }
    return user;
  }
}

export default UserService;
