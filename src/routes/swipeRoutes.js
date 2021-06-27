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
        const swipesData = req.body.swipes;

        const myNewSwipes = new Swipes({ swipes: swipesData })
        const _id = myNewSwipes._id
        // await mySwipes.save()

        let biggestCount = {_id: '', count: -1};

        const allSwipes = await Swipes.find({});
        allSwipes.map(user => {
            let matchesCount = 0;
            const userSwipes = user.swipes;
            swipesData.map((result, i) => {
                if (result === userSwipes[i]) {
                    matchesCount = matchesCount + 1
                }
            })

            //console.log(matchesCount)

            if (biggestCount.count < matchesCount) {
                biggestCount = { _id: user._id, count: matchesCount }
            }
        });

        await myNewSwipes.save();

        res.json({ success: true, matchId: biggestCount._id, countValue: biggestCount.count, err: null })
    } catch (err) {
        console.log(err)
        res.json({ success: false, data: {}, err: 'error' })
    }
})

module.exports = router;