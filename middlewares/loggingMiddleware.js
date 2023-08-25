const winston = require('winston');
const config = require('../config/config');
const path = require('path');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Affiche les logs dans la console
    new winston.transports.File({ filename: path.join(config.logsPath, 'access.log') }) // Stocke les logs dans un fichier
  ]
});

const loggingMiddleware = (req, res, next) => {
  logger.info(`${req.method} ${req.url} - ${res.statusCode}`);
  next();
};

module.exports = loggingMiddleware;