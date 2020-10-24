const express = require('express');
const router = express.Router();
const google = require('../auth/googleApi.js');

router.get('/setValue', (req, res, next) => {
    const { newVal } = req.query;
    google.setValue(newVal);
    res.send('done');
})

router.get('/value', (req, res, next) => {
    res.send(google.value);
})

router.get('/getValue', (req, res, next) => {
    res.send(google.getValue());
})

module.exports = router;