// __tests__/UserController.test.js
const request = require('supertest');
const app = require('../../index'); // L'import de votre point d'entrée de l'application

// Mock du UserService
jest.mock('../../services/UserService', () => ({
  createUser: jest.fn((userData) => Promise.resolve({ username: userData.username, email: userData.email })),
}));

describe('UserController', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        username: 'john_doe',
        email: 'john@example.com'
      });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('john_doe');
    
    // Vérification du mock
    expect(require('../services/UserService').createUser).toHaveBeenCalledWith({
      username: 'john_doe',
      email: 'john@example.com',
    });
  });
});