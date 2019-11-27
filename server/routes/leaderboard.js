const express = require('express');
const router = express.Router();
const db = require('../config/dbConnection');
const GameRecord = require('../models/GameRecord');

router.get('/', (req, res) => {
    db.find({})
        .sort({ points: -1 })
        .exec(function(err, docs) {
            if (err) return res.status(500).send('Ops, some error ocurred!');

            const records = docs.map(d => new GameRecord(d));
            res.json(records);
        });
});

router.post('/', (req, res) => {
    const gameRecord = new GameRecord(req.body);
    db.insert(gameRecord, function(err, doc) {
        if (err) res.status(500).send('Ops, some error ocurred!');

        res.status(201).json(doc);
    });
})

module.exports = router;