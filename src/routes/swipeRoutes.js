const express = require('express');
const mongoose = require('mongoose');
const Swipes = mongoose.model('Swipes');

const router = express.Router();

router.post('/create-swipes', async (req, res) => {
    try {
        const swipesData = req.body.swipes;

        const swipes = new Swipes({ swipes: swipesData, id: mongoose.Types.ObjectId() })
        const _id = swipes._id
        await swipes.save()
        res.json({ success: true, id: _id, err: null })
    } catch (err) {
        res.json({ success: false, data: {}, err: 'error' })
    }
})

router.post('/create-match', async (req, res) => {
    try {
        const id = req.body.id
        const mySwipes = req.body.swipes;

        const matchesCounts = [];

        const allSwipes = await Swipes.find({});
        allSwipes.map(user => {
            let mahtchesCount = 0;
            const userSwipes = user.swipes;
            mySwipes.map((result, i) => {
                if (result === userSwipes[i]) {
                    mahtchesCount++
                }
            })
            matchesCounts.push({ id: user._id, count: matchesCount })
        });

        console.log(matchesCounts)
        res.json({ success: true, matchId: '', err: null })
    } catch(err) {
        res.json({ success: false, err: 'error' })
    }
})

module.exports = router;