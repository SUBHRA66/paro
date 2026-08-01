import UserService from '../services/user.js';

class UserController {
  /**
   * @desc Create a new user
   * @route POST /user
   */
  static async createUser(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide name, email, and password',
        });
      }

      const user = await UserService.createUser({ name, email, password, role });
      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc Get all users
   * @route GET /user
   */
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc Get single user by ID
   * @route GET /user/:id
   */
  static async getUserById(req, res, next) {
    try {
      const user = await UserService.findUserById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `User not found with id ${req.params.id}`,
        });
      }
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc Update user by ID
   * @route PUT /user/:id
   */
  static async updateUser(req, res, next) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      return res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc Delete user by ID
   * @route DELETE /user/:id
   */
  static async deleteUser(req, res, next) {
    try {
      await UserService.deleteUser(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
