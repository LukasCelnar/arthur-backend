require('./models/User');

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const authRoutes = require('./routes/authRoutes.js')

const app = express();

app.use(express.json())

app.use(authRoutes);

const PORT = 3001

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', function() {
    console.log("connection established successfully");
});
app.listen(PORT, () => {
    console.log("Listening on port", PORT)
})