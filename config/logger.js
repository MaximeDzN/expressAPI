// logger.js
const winston = require('winston');
const path = require('path');
const config = require('./config');
const logger = winston.createLogger({
  level: 'info', // Niveau de log minimum (info, warn, error)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Affiche les logs dans la console
    new winston.transports.File({ filename: path.join(config.logsPath, 'app.log') }) // Stocke les logs dans le dossier "logs"
  ]
});

module.exports = logger;