const express = require('express');
const mongoose = require('mongoose');
const Objects = mongoose.model('Objects');

const router = express.Router();

router.get('/random-object', (req, res) => {
    try {
        Objects.count().exec(function (err, count) {
    
            // Get a random entry
            var random = Math.floor(Math.random() * count)
          
            // Again query all users but only fetch one offset by our random #
            Objects.findOne().skip(random).exec(
              function (err, result) {
                // Tada! random user
                res.json({ success: true, data: result, err: null })
              })
          })
    
    } catch (err) {
        res.json({ success: false, data: {}, err: 'error' })
    }
})

module.exports = router;