// UserService.js
const UserRepository = require('../repositories/UserRepository');

const UserService = {
  createUser: async (userData) => {
    try {
      const createdUser = await UserRepository.create(userData);
      return createdUser;
    } catch (error) {
      throw new Error('Could not create user');
    }
  },
  getUserById: async (userId) => {
    try {
      const user = await UserRepository.findById(userId);
      return user;
    } catch (error) {
      throw new Error('Could not fetch user by ID');
    }
  },
  // Autres méthodes
};

module.exports = UserService;