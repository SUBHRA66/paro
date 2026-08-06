import User from '../models/User.js';

class UserService {
  /**
   * Create a new user in database
   */
  static async createUser({ name, email, role }) {
    const user = await User.create({
      name,
      email,
      role: role || 'user',
    });
    return user;
  }

  /**
   * Find user by email
   */
  static async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  /**
   * Find user by ID
   */
  static async findUserById(id) {
    return await User.findById(id);
  }

  /**
   * Fetch all users
   */
  static async getAllUsers() {
    return await User.find();
  }

  /**
   * Update user details by ID
   */
  static async updateUser(id, updateData) {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

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
