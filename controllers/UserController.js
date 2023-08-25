// UserController.js
const UserService = require('../services/UserService');

const UserController = {
  createUser: async (req, res) => {
    const userData = req.body; // Assurez-vous que les données sont correctement formatées dans la requête

    try {
      const createdUser = await UserService.createUser(userData);
      res.status(201).json(createdUser); // 201: Created
    } catch (error) {
      res.status(500).json({ error: 'Could not create user' });
    }
  },
  getUserById: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await UserService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  // Autres méthodes
};

module.exports = UserController;