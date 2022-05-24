const express = require('express');
const router = express.Router();
'use strict';

const fs = require('fs');
let rawdata = fs.readFileSync('src/experience.json');
let data = JSON.parse(rawdata);


router.get('/api/salas/:sala', (req, res) => {

    const { sala } = req.params;
    const db = data.find(dta => dta.sala == sala);
    res.json(db);
});

module.exports = router;
