// userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', UserController.createUser);
router.get('/:id', UserController.getUserById);

module.exports = router;