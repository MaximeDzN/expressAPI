// services/AuthService.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const logger = require('../config/logger');

const AuthService = {
    login: async (loginRequest) => {
        try {
            const user = await User.findOne({ username: loginRequest.username });

            if (!user) return null;

            const passwordMatch = await bcrypt.compare(loginRequest.password, user.password);

            if (!passwordMatch) return null;

            const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecret);
            return token;
        } catch (error) {
            throw new Error('Authentication error');
        }
    },
    register: async (registerRequest) => {
        try {
            console.log(registerRequest);
            const hashedPassword = await bcrypt.hash(registerRequest.password, 10); // Salting and hashing the password
            const newUser = new User(
                { 
                    username: registerRequest.username,
                    email: registerRequest.email,
                    password: hashedPassword
                 });
            await newUser.save();
            return { message: 'User registered successfully' };
        } catch (error) {
            throw new Error('Registration error');
        }
    },
};

module.exports = AuthService;