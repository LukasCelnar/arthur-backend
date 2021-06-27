const mongoose = require('mongoose');

const swipesSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    swipes: [Number],
})

mongoose.model('Swipes', swipesSchema);