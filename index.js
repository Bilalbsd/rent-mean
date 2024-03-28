const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const utilisateurRoutes = require('./routes/utilisateurRoutes');
const bienRoutes = require('./routes/bienRoutes');
const locationRoutes = require('./routes/locationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Connexion à MongoDB
const connectDB = async () => {
    try {
        // await mongoose.connect('mongodb+srv://' + process.env.USER_PASSWORD_DB + '@cluster0.mojdgsb.mongodb.net/location-logements', {});
        await mongoose.connect('mongodb://127.0.0.1:27017')
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

connectDB();

// Routes API
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/biens', bienRoutes);
app.use('/api/locations', locationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
