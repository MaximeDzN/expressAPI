const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const config = require('./config/config');
const loggingMiddleware = require('./middlewares/loggingMiddleware'); // Assurez-vous du bon chemin



// Créer un dossier pour les fichiers de log s'il n'existe pas
if (!fs.existsSync(config.logsPath)) {
  fs.mkdirSync(config.logsPath);
}


mongoose.connect('mongodb://localhost:27017/express', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use(express.json());
app.use(loggingMiddleware);

app.use('/users', require('./Routes/UserRoutes'));
app.use('/auth', require('./Routes/AuthRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});