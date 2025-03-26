require('dotenv').config();
const express = require('express');
const app = express();

app.get('/firebase-config', (req, res) => {
    res.json({
        apiKey: process.env.API_KEY,
        authDomain: "bali-cup2025.firebaseapp.com",
        projectId: "bali-cup2025",
        storageBucket: "bali-cup2025.firebasestorage.app",
        messagingSenderId: "867421335336",
        appId: "1:867421335336:web:e046ccb32b631dcbf86a1d",
        measurementId: "G-484CZNKVQ1"
    });
});

app.listen(3000, () => console.log('Server läuft auf Port 3000'));
