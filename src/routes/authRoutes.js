const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');
const Session = mongoose.model('Session');

const router = express.Router();

const createSession = async (userId) => {
    const time = new Date().getTime(); // time
    const date = new Date(time); // time to date
    SESSION_TIME = date.toString();
    const hash = String(userId + SESSION_TIME);
    const HASH = await bcrypt.hash(hash, 10);
    // create session
    const session = new Session({ userId: userId, time: SESSION_TIME, hash: HASH });
    await session.save();
    return session
}

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body.data;
    
        const user = await User.findOne({ email })

        bcrypt.compare(password, user.password, async function(err, result) {
            if (result) {
                const session = await createSession(user._id);
                res.json({ success: true, data: { id: user._id, email: user.email, time: session.time, hash: session.hash }, err: null });
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
        const { email, password, sex, fullName, yearOfBirth } = req.body.data;
    
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                const user = new User({ email, password: hash, sex, fullName, yearOfBirth });
                await user.save();
                const session = await createSession(user._id);
                res.json({ success: true, data: { id: user._id, email: user.email, time: session.time, hash: session.hash }, err: null })
            });
        });

    } catch (err) {
        console.log(err)
        res.json({ success: false, data: {}, err: 'error' })
    }
})

router.post('/checklogin', async (req, res) => {
    try {
        const { id, hash, time } = req.body.data;
        const session = await Session.findOne({ userId: id, hash, time })

        if(session === null) {
            res.json({ loged: false })
        } else {
            res.json({ loged: true })
        }

    } catch (err) {
        console.log(err)
        res.json({ loged: false })
    }
})

module.exports = router;