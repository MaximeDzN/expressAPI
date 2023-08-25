// UserRepository.js
const User = require('../models/User');

const UserRepository = {
  create: async (userData) => {
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw new Error('Could not create user in the database');
    }
  },
  findById: async (userId) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        throw new Error('Could not fetch user by ID from the database');
      }
  },
  // Autres méthodes
};

module.exports = UserRepository;