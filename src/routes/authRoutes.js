const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body.data;
    
        const user = await User.findOne({ email })

        bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
                res.json({ success: true, data: {}, err: null });
            } else {
                res.json({ success: false, data: {}, err: 'error' });
            }
        });

    } catch (err) {
        console.log(err)
        res.json({ success: false, data: {}, err: 'error' })
    }
})

router.post('/signup', (req, res) => {
    try {
        const { email, password } = req.body.data;
    
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                const user = new User({ email, password: hash });
                await user.save()
                console.log(user)
                res.json({ success: true, data: {}, err: null })
            });
        });

    } catch (err) {
        console.log(err)
        res.json({ success: false, data: {}, err: 'error' })
    }
})

module.exports = router;