// controllers/AuthController.js
const AuthService = require('../services/AuthService');
const AuthDTO = require('../dtos/AuthDTO');
const logger = require('../config/logger');

const AuthController = {
  login: async (req, res) => {
    try {

      logger.info(`Login attempt for user ${req.body.username}`);
      const { error } = AuthDTO.loginSchema.validate(req.body);
      if (error) {
        logger.info(`Login attempt failed : ${error.details[0].message}`);
        return res.status(400).json({ message: error.details[0].message });
      }

      const token = await AuthService.login(req.body);

      if (!token) {
        logger.info(`Login attempt failed : Unauthorized`);
        return res.status(401).json({ message: 'Unauthorized' });
      }
      logger.info(`Login attempt successful`);
      res.json({ token });
    } catch (error) {
      logger.error(`Internal server error: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  register: async (req, res) => {
    try {
      const { error } = AuthDTO.registerSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });
      const result = await AuthService.register(req.body);
      logger.info(`user ${result.username} has been created`);
      res.status(201).json(result);
    } catch (error) {
      logger.error(`Internal server error: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = AuthController;