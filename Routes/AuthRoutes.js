// userRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/login', AuthController.login);
router.post('/register', AuthController.register);


module.exports = router;