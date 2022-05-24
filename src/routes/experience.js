const express = require('express');
const router = express.Router();
'use strict';
const fs = require('fs');
const underScore = require('underscore');

let rawdata = fs.readFileSync('src/experience.json');
let data = JSON.parse(rawdata);


router.get('/api/', (req, res) => {
    res.json(data);
});

router.post('/api/', (req, res) => {

    const {title, description, sala } = req.body;

    if (title && description && sala) {

        const id = data.length + 1;
        const newExperience = {id,...req.body};
        data.push(newExperience);
        const db = JSON.stringify(data, null, 2);
        fs.writeFileSync('src/experience.json', db);
        res.json(db);

    } else {
        res.send('Error');
    }
});

router.get('/api/:id', (req, res) => {
    const { id } = req.params;
    const db =data.find(experience => experience.id == id);
    res.json(db);
});

router.put('/api/:id', (req, res) => {
    const { id } = req.params;
    const {title, description, sala } = req.body;
    if (title && description && sala) {
        underScore.each(data, (dta, i) => {
            if (dta.id === id) {
                dta.title = title;
                dta.description = description;
                dta.sala = sala;
            }
        }
        );
        const db = JSON.stringify(data, null, 2);
        fs.writeFileSync('src/experience.json', db);
        res.json(data);
    } else {
        res.status(500).json({error: "todos los campos son requeridos!"})
    }

});

router.delete('/api/:id', (req, res) => {
    const { id } = req.params;
    underScore.each(data, (dta, i) => {
        if (dta.id == id) {
            data.splice(i, 1);
            const db = JSON.stringify(data, null, 2);
            fs.writeFileSync('src/experience.json', db);
        }
    });
    res.json(data);
});

module.exports = router;