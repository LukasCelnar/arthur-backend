const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    time: {
        type: Date,
        required: true,
    },
    hash: {
        type: String,
        unique: true,
        required: true
    }
})

mongoose.model('Session', sessionSchema);